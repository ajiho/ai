import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const TARGET_SIZE = [10, 20];
// const TARGET_SIZE = 15;

const dist = join(import.meta.dirname, "..", "dist");
const file = join(dist, "index.js");

await mkdir(dist, { recursive: true });

const targetSize = resolveTargetSize(TARGET_SIZE);

let code = "";
let i = 0;

while (Buffer.byteLength(code) < targetSize) {
  code += `
export function dummy${i}(value) {
  return value + ${i};
}
`;
  i++;
}

await writeFile(file, code);

console.log(
  `Generated ${(Buffer.byteLength(code) / 1024).toFixed(2)} KB (${i} functions)`,
);

function resolveTargetSize(size) {
  if (Array.isArray(size)) {
    const [min, max] = size;
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1024;
  }

  return size * 1024;
}
