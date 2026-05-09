import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const task = process.argv[2];
const rootDir = process.cwd();
const deployDir = path.join(rootDir, "deploy");
const domainLabel = "deploy";

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

const collectFiles = (directory, predicate, found = []) => {
  if (!existsSync(directory)) {
    return found;
  }

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, predicate, found);
      continue;
    }

    if (entry.isFile() && predicate(fullPath)) {
      found.push(fullPath);
    }
  }

  return found;
};

const runCommand = (command, args) => {
  statusInfo("executed", `Running ${command} ${args.join(" ")}`);
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (typeof result.status === "number") {
    return result.status;
  }
  return 1;
};

if (!task) {
  console.error("Usage: node scripts/orchestration/run-deploy-task.mjs <lint|validate>");
  process.exit(1);
}

if (!existsSync(deployDir)) {
  statusInfo("skipped-intentional", "No deploy directory found.");
  process.exit(0);
}

const hasTerraform = existsSync(path.join(deployDir, "terraform"));
const hasHelm = existsSync(path.join(deployDir, "helm"));
const hasKubernetes = existsSync(path.join(deployDir, "kubernetes"));

if (!hasTerraform && !hasHelm && !hasKubernetes) {
  statusError(
    "blocked-missing-artifact",
    "Deploy domain exists but no deploy/{terraform|helm|kubernetes} subdomain is present.",
  );
  process.exit(1);
}

const ensureTool = (command, label) => {
  if (!commandAvailable(command)) {
    statusError("blocked-missing-tooling", `${label} tool is required but not available on PATH.`);
    process.exit(1);
  }
};

if (task === "lint") {
  if (hasTerraform) {
    ensureTool("terraform", "terraform");
    const terraformStatus = runCommand("terraform", [
      "fmt",
      "-check",
      "-recursive",
      "deploy/terraform",
    ]);
    if (terraformStatus !== 0) process.exit(terraformStatus);
  }

  if (hasHelm) {
    const chartFiles = collectFiles(path.join(deployDir, "helm"), (filePath) =>
      filePath.endsWith("Chart.yaml"),
    );
    if (chartFiles.length === 0) {
      statusError(
        "blocked-missing-artifact",
        "deploy/helm exists but no Chart.yaml artifact was found.",
      );
      process.exit(1);
    }

    ensureTool("helm", "helm");
    for (const chartFile of chartFiles) {
      const chartDir = path.dirname(chartFile);
      const helmStatus = runCommand("helm", ["lint", chartDir]);
      if (helmStatus !== 0) process.exit(helmStatus);
    }
  }

  if (hasKubernetes) {
    const manifestFiles = collectFiles(path.join(deployDir, "kubernetes"), (filePath) =>
      [".yml", ".yaml"].some((extension) => filePath.endsWith(extension)),
    );
    if (manifestFiles.length === 0) {
      statusError(
        "blocked-missing-artifact",
        "deploy/kubernetes exists but no YAML manifest artifact was found.",
      );
      process.exit(1);
    }

    ensureTool("kubectl", "kubectl");
    const kubectlStatus = runCommand("kubectl", [
      "apply",
      "--dry-run=client",
      "-f",
      path.join("deploy", "kubernetes"),
    ]);
    if (kubectlStatus !== 0) process.exit(kubectlStatus);
  }

  process.exit(0);
}

if (task === "validate") {
  if (hasTerraform) {
    const terraformRoot = path.join(deployDir, "terraform");
    const terraformEntries = existsSync(terraformRoot) ? readdirSync(terraformRoot) : [];
    if (terraformEntries.length === 0) {
      statusError(
        "blocked-missing-artifact",
        "deploy/terraform exists but contains no validation targets.",
      );
      process.exit(1);
    }

    ensureTool("terraform", "terraform");
    const terraformStatus = runCommand("terraform", ["validate", "deploy/terraform"]);
    if (terraformStatus !== 0) process.exit(terraformStatus);
  }

  if (hasHelm) {
    const chartFiles = collectFiles(path.join(deployDir, "helm"), (filePath) =>
      filePath.endsWith("Chart.yaml"),
    );
    if (chartFiles.length === 0) {
      statusError(
        "blocked-missing-artifact",
        "deploy/helm exists but no Chart.yaml artifact was found.",
      );
      process.exit(1);
    }

    ensureTool("helm", "helm");
    for (const chartFile of chartFiles) {
      const chartDir = path.dirname(chartFile);
      const helmStatus = runCommand("helm", ["template", chartDir]);
      if (helmStatus !== 0) process.exit(helmStatus);
    }
  }

  if (hasKubernetes) {
    const manifestFiles = collectFiles(path.join(deployDir, "kubernetes"), (filePath) =>
      [".yml", ".yaml"].some((extension) => filePath.endsWith(extension)),
    );
    if (manifestFiles.length === 0) {
      statusError(
        "blocked-missing-artifact",
        "deploy/kubernetes exists but no YAML manifest artifact was found.",
      );
      process.exit(1);
    }

    ensureTool("kubectl", "kubectl");
    const kubectlStatus = runCommand("kubectl", [
      "apply",
      "--dry-run=server",
      "-f",
      path.join("deploy", "kubernetes"),
    ]);
    if (kubectlStatus !== 0) process.exit(kubectlStatus);
  }

  process.exit(0);
}

console.error(`Unsupported deploy task: ${task}`);
process.exit(1);
