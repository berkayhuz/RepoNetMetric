import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageJsonPath = path.join(__dirname, "..", "package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const packageRoot = path.join(__dirname, "..");

const allowedPublicExports = new Set([
  ".",
  "./client",
  "./styles/globals.css",
  "./styles/theme.css",
  "./styles/tokens.css",
]);

const requiredExports = [...allowedPublicExports];
const requiredClientSymbols = [
  "Avatar",
  "Calendar",
  "Carousel",
  "Checkbox",
  "DataGrid",
  "DirectionProvider",
  "Label",
];
const disallowedMainSymbols = new Set(requiredClientSymbols);
const allowedLibPublicExports = new Set([
  "./lib/utils",
  "./lib/accessibility",
  "./lib/format",
  "./lib/variants",
]);

function collectReExports(sourceText) {
  const reExports = [];
  const namedExportPattern = /export\s+(type\s+)?\{([\s\S]*?)\}\s+from\s+["']([^"']+)["']/g;
  let match = null;

  while ((match = namedExportPattern.exec(sourceText)) !== null) {
    const symbols = match[2]
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => value.replace(/^type\s+/, ""))
      .map((value) => value.split(/\s+as\s+/)[1]?.trim() ?? value.split(/\s+as\s+/)[0].trim());

    reExports.push({
      source: match[3],
      symbols,
    });
  }

  return reExports;
}

function resolveSourceFile(fromFile, sourceSpecifier) {
  const base = path.resolve(path.dirname(fromFile), sourceSpecifier);
  const candidates = [
    `${base}.ts`,
    `${base}.tsx`,
    path.join(base, "index.ts"),
    path.join(base, "index.tsx"),
    base,
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }

  throw new Error(`Unable to resolve export target: ${sourceSpecifier} from ${fromFile}`);
}

function hasUseClientDirective(filePath) {
  const source = fs.readFileSync(filePath, "utf-8");
  return /^\s*["']use client["'];?/m.test(source);
}

function walkFiles(dirPath, output = []) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      walkFiles(fullPath, output);
      continue;
    }

    if (entry.isFile() && (fullPath.endsWith(".ts") || fullPath.endsWith(".tsx"))) {
      output.push(fullPath);
    }
  }
  return output;
}

for (const exportKey of requiredExports) {
  const exportPath = packageJson.exports?.[exportKey];
  if (typeof exportPath !== "string") {
    throw new Error(`Missing export map entry: ${exportKey}`);
  }

  const resolvedPath = path.join(__dirname, "..", exportPath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Export path does not exist for ${exportKey}: ${exportPath}`);
  }
}

for (const exportKey of Object.keys(packageJson.exports ?? {})) {
  if (!allowedPublicExports.has(exportKey)) {
    throw new Error(`Unexpected public export entry found in package.json: ${exportKey}`);
  }
}

const publicSpecifiers = [
  "@netmetric/ui",
  "@netmetric/ui/client",
  "@netmetric/ui/styles/globals.css",
  "@netmetric/ui/styles/theme.css",
  "@netmetric/ui/styles/tokens.css",
];

for (const specifier of publicSpecifiers) {
  let resolved;
  try {
    resolved = import.meta.resolve(specifier);
  } catch (error) {
    throw new Error(`Failed to resolve public specifier: ${specifier}\n${String(error)}`);
  }

  if (!resolved?.startsWith("file://")) {
    throw new Error(`Unexpected resolution for ${specifier}: ${resolved}`);
  }
}

const mainEntryPath = path.join(packageRoot, packageJson.exports["."]);
const mainEntrySource = fs.readFileSync(mainEntryPath, "utf-8");
const mainReExports = collectReExports(mainEntrySource);

for (const reExport of mainReExports) {
  if (reExport.source.startsWith("./hooks/")) {
    throw new Error(`Main entry exports a hook source, must be client-only: ${reExport.source}`);
  }

  if (reExport.source.startsWith("./lib/") && !allowedLibPublicExports.has(reExport.source)) {
    throw new Error(`Main entry exports internal lib helper: ${reExport.source}`);
  }

  const targetFile = resolveSourceFile(mainEntryPath, reExport.source);
  if (hasUseClientDirective(targetFile)) {
    throw new Error(`Main entry re-exports a client-only module: ${reExport.source}`);
  }

  for (const symbol of reExport.symbols) {
    if (disallowedMainSymbols.has(symbol)) {
      throw new Error(`Main entry exports client-only symbol: ${symbol}`);
    }
  }
}

const clientEntryPath = path.join(packageRoot, packageJson.exports["./client"]);
const clientEntrySource = fs.readFileSync(clientEntryPath, "utf-8");
const clientReExports = collectReExports(clientEntrySource);

for (const reExport of clientReExports) {
  if (reExport.source.startsWith("./lib/") && !allowedLibPublicExports.has(reExport.source)) {
    throw new Error(`Client entry exports internal lib helper: ${reExport.source}`);
  }
}

for (const symbol of requiredClientSymbols) {
  const exported = new RegExp(`\\b${symbol}\\b`, "m").test(clientEntrySource);
  if (!exported) {
    throw new Error(`Missing client symbol in client entry source: ${symbol}`);
  }
}

const srcFiles = walkFiles(path.join(packageRoot, "src"));
for (const filePath of srcFiles) {
  const source = fs.readFileSync(filePath, "utf-8");
  if (/from\s+["']@netmetric\/ui(?:\/[^"']*)?["']/.test(source)) {
    throw new Error(`Package self-reference import found: ${path.relative(packageRoot, filePath)}`);
  }
}

console.log("exports smoke check passed");
