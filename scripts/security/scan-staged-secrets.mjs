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

const offenders = [];

for (const file of stagedFiles) {
  const content = execFileSync("git", ["show", `:${file}`], { encoding: "utf8" });
  const lines = content.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    for (const pattern of patterns) {
      if (pattern.regex.test(line)) {
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
