#!/usr/bin/env node
/**
 * Predictable performance regression check (dependency-free).
 *
 * Enforces, programmatically, the rules that keep this static site fast:
 *   1. Every `"use client"` boundary carries a one-line "why" comment.
 *   2. Raster images in public/ stay within a size budget.
 *   3. Components use no raw <img> tags (layout-shift / unsized-media risk).
 *
 * Run with `pnpm audit:perf`. Exits non-zero on any finding (CI-friendly).
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

// --- Tunables ------------------------------------------------------------
const ROOT = process.cwd();
const SRC_DIR = join(ROOT, "src");
const PUBLIC_DIR = join(ROOT, "public");
const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const IMAGE_BUDGET_KB = 200; // un-optimized images above this are flagged
// -------------------------------------------------------------------------

const findings = [];
const rel = (p) => relative(ROOT, p).replace(/\\/g, "/");

/** Recursively list every file under `dir` (returns [] if it doesn't exist). */
function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

// 1 + 3: scan component source -------------------------------------------
for (const file of walk(SRC_DIR)) {
  if (![".tsx", ".ts", ".jsx", ".js"].includes(extname(file))) continue;
  if (/\.test\.[tj]sx?$/.test(file)) continue;

  const lines = readFileSync(file, "utf8").split(/\r?\n/);

  lines.forEach((line, i) => {
    // "use client" must be justified by a nearby comment.
    if (/^\s*["']use client["'];?\s*$/.test(line)) {
      const context = [lines[i - 1], line, lines[i + 1]].join("\n");
      if (!context.includes("//")) {
        findings.push(
          `${rel(file)}:${i + 1}  "use client" without a one-line "why" comment`,
        );
      }
    }
    // Raw <img> tags.
    if (/<img[\s/>]/.test(line)) {
      findings.push(
        `${rel(file)}:${i + 1}  raw <img> tag — risks layout shift / unsized media`,
      );
    }
  });
}

// 2: scan static raster images -------------------------------------------
for (const file of walk(PUBLIC_DIR)) {
  if (!RASTER_EXTENSIONS.has(extname(file).toLowerCase())) continue;
  const sizeKb = statSync(file).size / 1024;
  if (sizeKb > IMAGE_BUDGET_KB) {
    findings.push(
      `${rel(file)}  ${sizeKb.toFixed(0)} KB exceeds ${IMAGE_BUDGET_KB} KB budget — compress or resize`,
    );
  }
}

// Report ------------------------------------------------------------------
if (findings.length === 0) {
  console.log("✓ perf-review: no predictable regressions found");
  process.exit(0);
}

console.error(`✗ perf-review: ${findings.length} finding(s)\n`);
for (const f of findings) console.error("  • " + f);
console.error("\nSee .ai/skills/perf-review/SKILL.md");
process.exit(1);
