import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("==> Building AURA Frontend for Vercel...");
execSync("npm --prefix Frontend run build", { stdio: "inherit" });

const frontendVercel = path.join(process.cwd(), "Frontend", ".vercel");
const rootVercel = path.join(process.cwd(), ".vercel");
const frontendStatic = path.join(process.cwd(), "Frontend", ".vercel", "output", "static");
const rootPublic = path.join(process.cwd(), "public");
const frontendOutput = path.join(process.cwd(), "Frontend", ".output");
const rootOutput = path.join(process.cwd(), ".output");

// 1. Sync .vercel output to root
if (fs.existsSync(frontendVercel)) {
  console.log("==> Syncing .vercel/output to root...");
  fs.cpSync(frontendVercel, rootVercel, { recursive: true });
}

// 2. Sync static assets to root/public as fallback
if (fs.existsSync(frontendStatic)) {
  console.log("==> Syncing static assets to root/public...");
  fs.cpSync(frontendStatic, rootPublic, { recursive: true });
}

// 3. Sync .output if generated
if (fs.existsSync(frontendOutput)) {
  fs.cpSync(frontendOutput, rootOutput, { recursive: true });
}

console.log("==> Vercel Build completed successfully!");
