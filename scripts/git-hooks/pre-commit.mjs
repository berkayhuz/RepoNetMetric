import { execFileSync, execSync } from "node:child_process";

const run = (command) => execSync(command, { stdio: "inherit" });

const stagedFiles = execFileSync("git", ["diff", "--cached", "--name-only", "--diff-filter=ACMR"], {
  encoding: "utf8",
})
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter(Boolean);

if (stagedFiles.length === 0) {
  process.exit(0);
}

run("pnpm run guard:secrets");
run("pnpm exec lint-staged");

const typecheckTargets = new Set();

for (const file of stagedFiles) {
  if (file.startsWith("packages/frontend/ui/")) {
    typecheckTargets.add("@netmetric/ui");
    continue;
  }

  if (file.startsWith("packages/frontend/config/")) {
    typecheckTargets.add("@netmetric/config");
    continue;
  }

  if (file.startsWith("packages/frontend/types/")) {
    typecheckTargets.add("@netmetric/types");
  }
}

if (typecheckTargets.size === 0) {
  process.exit(0);
}

for (const pkg of typecheckTargets) {
  run(`pnpm --filter ${pkg} typecheck`);
}
