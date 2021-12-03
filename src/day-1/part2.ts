import fs from "fs";
import path from "path";
import { readInput } from "../utils";

const depths = readInput(__dirname).map((d) => parseInt(d, 10));

const WINDOW_SIZE = 3;

const sum3 = (array: number[], start: number) =>
  array[start] + array[start - 1] + array[start - 2];

let increases = 0;

const lines = [sum3(depths, WINDOW_SIZE - 1) + " (N/A - no previous sum)"];
for (let i = WINDOW_SIZE; i < depths.length; ++i) {
  let currentSum = sum3(depths, i);
  let previousSum = sum3(depths, i - 1);
  let line = currentSum.toString();
  if (currentSum > previousSum) {
    ++increases;
    line += " (increased)";
  } else if (currentSum === previousSum) {
    line += " (no change)";
  } else {
    line += " (decreased";
  }
  lines.push(line);
}

console.log(
  `there are ${increases} sums that are larger than the previous sum`
);
fs.writeFileSync(path.resolve(__dirname, "output2.txt"), lines.join("\n"));
