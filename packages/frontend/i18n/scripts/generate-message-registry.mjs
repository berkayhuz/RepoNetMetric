import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const messagesDir = path.join(packageRoot, "src", "messages");
const outputPath = path.join(packageRoot, "src", "message-registry.generated.ts");

const files = await fs.readdir(messagesDir);
const locales = files
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/i, ""))
  .sort((left, right) => left.localeCompare(right));

if (!locales.includes("en")) {
  throw new Error("messages/en.json is required as the default fallback locale.");
}

const importLines = locales.map(
  (locale) => `import ${locale.replace(/-/g, "_")} from "./messages/${locale}.json";`,
);
const localeList = locales.map((locale) => `"${locale}"`).join(", ");
const dictionaryLines = locales.map((locale) => `  "${locale}": ${locale.replace(/-/g, "_")},`);

const content = `${importLines.join("\n")}

export const availableMessageLocales = [${localeList}] as const;

export const messageRegistry = {
${dictionaryLines.join("\n")}
} as const;
`;

await fs.writeFile(outputPath, content, "utf8");
