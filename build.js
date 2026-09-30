import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("==> Building AURA Frontend for Vercel...");
execSync("npm --prefix Frontend run build", { stdio: "inherit" });

const frontendVercel = path.join(process.cwd(), "Frontend", ".vercel");
const rootVercel = path.join(process.cwd(), ".vercel");

if (fs.existsSync(frontendVercel)) {
  console.log("==> Syncing .vercel output to root...");
  fs.cpSync(frontendVercel, rootVercel, { recursive: true });
}

console.log("==> Vercel Build completed successfully!");
