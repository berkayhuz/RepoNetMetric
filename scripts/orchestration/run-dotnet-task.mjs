import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const task = process.argv[2];

if (!task) {
  console.error(
    "Usage: node scripts/orchestration/run-dotnet-task.mjs <restore|build|test|format>",
  );
  process.exit(1);
}

const rootDir = process.cwd();
const domainLabel = "dotnet";

const statusInfo = (status, message) => {
  console.log(`[${domainLabel}] STATUS=${status} ${message}`);
};

const statusError = (status, message) => {
  console.error(`[${domainLabel}] STATUS=${status} ${message}`);
};

const commandAvailable = (command) => {
  const check = spawnSync(command, ["--version"], { stdio: "pipe" });
  return check.status === 0;
};

const hasDotnetDomainSignals = () => {
  const domainIndicators = [
    "services",
    "platform",
    path.join("packages", "dotnet"),
    "Directory.Build.props",
    "Directory.Build.targets",
    "Directory.Packages.props",
    "global.json",
  ];

  if (domainIndicators.some((item) => existsSync(path.join(rootDir, item)))) {
    return true;
  }

  const rootEntries = readdirSync(rootDir, { withFileTypes: true });
  return rootEntries.some(
    (entry) =>
      entry.isFile() &&
      [".sln", ".slnx", ".csproj"].some((extension) =>
        entry.name.toLowerCase().endsWith(extension),
      ),
  );
};

const pickDotnetTarget = () => {
  const explicitCandidates = ["Netmetric.slnx", "Netmetric.sln", "netmetric.slnx", "netmetric.sln"];
  for (const candidate of explicitCandidates) {
    if (existsSync(path.join(rootDir, candidate))) {
      return candidate;
    }
  }

  const entries = readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  const slnx = entries.find((name) => name.toLowerCase().endsWith(".slnx"));
  if (slnx) {
    return slnx;
  }

  const sln = entries.find((name) => name.toLowerCase().endsWith(".sln"));
  if (sln) {
    return sln;
  }

  return null;
};

const target = pickDotnetTarget();

if (!target) {
  if (hasDotnetDomainSignals()) {
    statusError(
      "blocked-missing-artifact",
      "Dotnet domain signals exist, but no solution file (.sln/.slnx) was found at repository root.",
    );
    process.exit(1);
  }

  statusInfo("skipped-intentional", "No dotnet domain signals detected.");
  process.exit(0);
}

const commands = {
  restore: ["restore", target],
  build: ["build", target, "--configuration", "Release", "--nologo"],
  test: ["test", target, "--configuration", "Release", "--nologo", "--no-build"],
  format: ["format", target, "--verify-no-changes", "--no-restore"],
};

const args = commands[task];
if (!args) {
  console.error(`Unsupported dotnet task: ${task}`);
  process.exit(1);
}

if (!commandAvailable("dotnet")) {
  statusError("blocked-missing-tooling", "dotnet CLI is required but not available on PATH.");
  process.exit(1);
}

statusInfo("executed", `Running dotnet ${args.join(" ")}`);
const result = spawnSync("dotnet", args, { stdio: "inherit" });
if (typeof result.status === "number") {
  process.exit(result.status);
}
statusError("blocked-missing-tooling", "Failed to execute dotnet process.");
process.exit(1);
