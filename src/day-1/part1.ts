import { assert } from "console";
import fs from "fs";
import path from "path";

const depths = fs
  .readFileSync(path.resolve(__dirname, "input.txt"))
  .toString()
  .split("\n");
assert(depths.length > 0);

let increases = 0;
const lines = [depths[0] + " (N/A - no previous measurement)"];
for (let i = 1; i < depths.length; ++i) {
  let currentDepth = parseInt(depths[i], 10);
  let previousDepth = parseInt(depths[i - 1], 10);
  let line = depths[i];
  if (currentDepth > previousDepth) {
    ++increases;
    line += " (increased)";
  } else {
    line += " (decreased)";
  }
  lines.push(line);
}

console.log(
  `there are ${increases} measurements that are larger than the previous measurement`
);
fs.writeFileSync(path.resolve(__dirname, "output1.txt"), lines.join("\n"));
