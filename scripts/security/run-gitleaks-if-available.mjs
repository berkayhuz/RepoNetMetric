import { spawnSync } from "node:child_process";

const versionCheck = spawnSync("gitleaks", ["version"], { encoding: "utf8" });

if (versionCheck.status !== 0) {
  console.log("Gitleaks is not installed locally. Skipping local gitleaks scan.");
  process.exit(0);
}

const result = spawnSync(
  "gitleaks",
  ["detect", "--source=.", "--config=.gitleaks.toml", "--no-banner", "--redact", "--exit-code=1"],
  { stdio: "inherit" },
);

if (typeof result.status === "number") {
  process.exit(result.status);
}

process.exit(1);
