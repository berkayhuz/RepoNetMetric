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

const ensureTool = (command, label) => {
  if (!commandAvailable(command)) {
    statusError("blocked-missing-tooling", `${label} tool is required but not available on PATH.`);
    process.exit(1);
  }
};

const getDomainArtifacts = () => {
  const hasTerraform = existsSync(path.join(deployDir, "terraform"));
  const hasHelm = existsSync(path.join(deployDir, "helm"));
  const hasKubernetes = existsSync(path.join(deployDir, "kubernetes"));

  const terraformFiles = hasTerraform
    ? collectFiles(path.join(deployDir, "terraform"), (filePath) =>
        [".tf", ".tfvars"].some((extension) => filePath.endsWith(extension)),
      )
    : [];
  const helmChartFiles = hasHelm
    ? collectFiles(path.join(deployDir, "helm"), (filePath) => filePath.endsWith("Chart.yaml"))
    : [];
  const kubernetesManifestFiles = hasKubernetes
    ? collectFiles(path.join(deployDir, "kubernetes"), (filePath) =>
        [".yml", ".yaml"].some((extension) => filePath.endsWith(extension)),
      )
    : [];

  return {
    hasTerraform,
    hasHelm,
    hasKubernetes,
    terraformFiles,
    helmChartFiles,
    kubernetesManifestFiles,
  };
};

if (!task) {
  console.error("Usage: node scripts/orchestration/run-deploy-task.mjs <lint|validate>");
  process.exit(1);
}

if (!existsSync(deployDir)) {
  statusInfo("skipped-intentional", "No deploy directory found.");
  process.exit(0);
}

const artifacts = getDomainArtifacts();

if (!artifacts.hasTerraform && !artifacts.hasHelm && !artifacts.hasKubernetes) {
  statusInfo(
    "skipped-intentional",
    "Deploy domain has no deploy/{terraform|helm|kubernetes} subdomain yet.",
  );
  process.exit(0);
}

if (
  artifacts.terraformFiles.length === 0 &&
  artifacts.helmChartFiles.length === 0 &&
  artifacts.kubernetesManifestFiles.length === 0
) {
  statusInfo("skipped-intentional", "Deploy subdomains are scaffold-only (no artifacts yet).");
  process.exit(0);
}

if (task === "lint") {
  if (artifacts.hasTerraform) {
    if (artifacts.terraformFiles.length === 0) {
      statusInfo("skipped-intentional", "deploy/terraform has no .tf artifacts yet.");
    } else {
      ensureTool("terraform", "terraform");
      const terraformStatus = runCommand("terraform", [
        "fmt",
        "-check",
        "-recursive",
        "deploy/terraform",
      ]);
      if (terraformStatus !== 0) process.exit(terraformStatus);
    }
  }

  if (artifacts.hasHelm) {
    if (artifacts.helmChartFiles.length === 0) {
      statusInfo("skipped-intentional", "deploy/helm has no Chart.yaml artifacts yet.");
    } else {
      ensureTool("helm", "helm");
      for (const chartFile of artifacts.helmChartFiles) {
        const chartDir = path.dirname(chartFile);
        const helmStatus = runCommand("helm", ["lint", chartDir]);
        if (helmStatus !== 0) process.exit(helmStatus);
      }
    }
  }

  if (artifacts.hasKubernetes) {
    if (artifacts.kubernetesManifestFiles.length === 0) {
      statusInfo("skipped-intentional", "deploy/kubernetes has no YAML artifacts yet.");
    } else {
      ensureTool("kubectl", "kubectl");
      const kubectlStatus = runCommand("kubectl", [
        "apply",
        "--dry-run=client",
        "-f",
        path.join("deploy", "kubernetes"),
      ]);
      if (kubectlStatus !== 0) process.exit(kubectlStatus);
    }
  }

  process.exit(0);
}

if (task === "validate") {
  if (artifacts.hasTerraform) {
    if (artifacts.terraformFiles.length === 0) {
      statusInfo("skipped-intentional", "deploy/terraform has no .tf artifacts yet.");
    } else {
      ensureTool("terraform", "terraform");
      const terraformStatus = runCommand("terraform", ["validate", "deploy/terraform"]);
      if (terraformStatus !== 0) process.exit(terraformStatus);
    }
  }

  if (artifacts.hasHelm) {
    if (artifacts.helmChartFiles.length === 0) {
      statusInfo("skipped-intentional", "deploy/helm has no Chart.yaml artifacts yet.");
    } else {
      ensureTool("helm", "helm");
      for (const chartFile of artifacts.helmChartFiles) {
        const chartDir = path.dirname(chartFile);
        const helmStatus = runCommand("helm", ["template", chartDir]);
        if (helmStatus !== 0) process.exit(helmStatus);
      }
    }
  }

  if (artifacts.hasKubernetes) {
    if (artifacts.kubernetesManifestFiles.length === 0) {
      statusInfo("skipped-intentional", "deploy/kubernetes has no YAML artifacts yet.");
    } else {
      ensureTool("kubectl", "kubectl");
      const kubectlStatus = runCommand("kubectl", [
        "apply",
        "--dry-run=client",
        "-f",
        path.join("deploy", "kubernetes"),
      ]);
      if (kubectlStatus !== 0) process.exit(kubectlStatus);
    }
  }

  process.exit(0);
}

console.error(`Unsupported deploy task: ${task}`);
process.exit(1);
