import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

function resolveGitleaksExecutable() {
  const candidates =
    process.platform === "win32"
      ? [String.raw`C:\Program Files\gitleaks\gitleaks.exe`]
      : ["/usr/bin/gitleaks", "/usr/local/bin/gitleaks"];

  return candidates.find((candidate) => existsSync(candidate)) ?? "gitleaks";
}

const gitleaksExecutable = resolveGitleaksExecutable();
const safePath = gitleaksExecutable.includes(path.sep)
  ? path.dirname(gitleaksExecutable)
  : process.env.PATH;
const safeEnv = { ...process.env, PATH: safePath };

const versionCheck = spawnSync(gitleaksExecutable, ["version"], { encoding: "utf8", env: safeEnv });

if (versionCheck.status !== 0) {
  console.log("Gitleaks is not installed locally. Skipping local gitleaks scan.");
  process.exit(0);
}

const result = spawnSync(
  gitleaksExecutable,
  ["detect", "--source=.", "--config=.gitleaks.toml", "--no-banner", "--redact", "--exit-code=1"],
  { stdio: "inherit", env: safeEnv },
);

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
