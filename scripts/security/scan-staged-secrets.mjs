import { execFileSync } from "node:child_process";

const stagedFiles = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
  encoding: "utf8",
})
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean)
  .filter((file) => !file.endsWith(".env.example"));

if (stagedFiles.length === 0) {
  process.exit(0);
}

const patterns = [
  {
    name: "AWS access key",
    regex: /\bAKIA[0-9A-Z]{16}\b/,
  },
  {
    name: "Private key block",
    regex: /-----BEGIN (RSA|OPENSSH|EC|DSA|PGP) PRIVATE KEY-----/,
  },
  {
    name: "Generic secret assignment",
    regex:
      /\b(API[_-]?KEY|SECRET|TOKEN|PASSWORD|PRIVATE[_-]?KEY)\b\s*[:=]\s*["']?(?!changeme|example|test|placeholder)[^\s"']{8,}/i,
  },
];

const falsePositiveAllowlist = [
  /\$env:SONAR_TOKEN\b/,
  /\$\{env:SONAR_TOKEN\}/,
  /\bprocess\.env\.SONAR_TOKEN\b/,
];

function isAllowlisted(line) {
  return falsePositiveAllowlist.some((pattern) => pattern.test(line));
}

function isScannerRuleDefinitionLine(file, line) {
  const normalizedFile = file.replace(/\\/g, "/");
  if (normalizedFile !== "scripts/security/scan-staged-secrets.mjs") {
    return false;
  }

  const selfRuleDefinitions = [
    /name:\s*"Generic secret assignment"/,
    /\\b\(API\[_-\]\?KEY\|SECRET\|TOKEN\|PASSWORD\|PRIVATE\[_-\]\?KEY\)\\b/,
    /\[\?&\]\(token\|secret\|password\)=/,
    /\\b\(TOKEN\|PASSWORD\|SECRET\|PRIVATE\[_-\]\?KEY\)\\b\\s\*\[:=\]/,
  ];

  return selfRuleDefinitions.some((pattern) => pattern.test(line));
}

function isGenericFalsePositive(line) {
  // URL query fragments are allowlisted only when the credential value is clearly dynamic
  // (for example placeholder/interpolated values), not for literal values.
  if (/[?&](token|secret|password)=(\{[^}]+\}|\$\{[^}]+\})/i.test(line)) {
    return true;
  }

  // Ignore identifier/expression assignments (for example: Password = value.Password).
  if (
    /\b(TOKEN|PASSWORD|SECRET|PRIVATE[_-]?KEY)\b\s*[:=]\s*[A-Za-z_][A-Za-z0-9_.()]*\s*[,;)]?\s*$/i.test(
      line,
    )
  ) {
    return true;
  }

  return false;
}

const offenders = [];

for (const file of stagedFiles) {
  const content = execFileSync("git", ["show", `:${file}`], { encoding: "utf8" });
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const pattern of patterns) {
      if (pattern.regex.test(line)) {
        if (isAllowlisted(line)) {
          continue;
        }

        if (
          pattern.name === "Generic secret assignment" &&
          isScannerRuleDefinitionLine(file, line)
        ) {
          continue;
        }

        if (pattern.name === "Generic secret assignment" && isGenericFalsePositive(line)) {
          continue;
        }

        offenders.push({
          file,
          line: index + 1,
          reason: pattern.name,
        });
      }
    }
  }
}

if (offenders.length === 0) {
  process.exit(0);
}

console.error("Secret scanning failed. Potential secrets were found in staged changes:");

for (const offender of offenders) {
  console.error(`- ${offender.file}:${offender.line} (${offender.reason})`);
}

console.error("If this is a false positive, replace the value with a non-sensitive placeholder.");
process.exit(1);
