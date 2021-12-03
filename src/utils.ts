import { assert } from "console";
import fs from "fs";
import path from "path";

export function readInput(dir: string): any[] {
  const inputs = fs
    .readFileSync(path.resolve(dir, "input.txt"))
    .toString()
    .split("\n");
  assert(inputs.length > 0);
  return inputs;
}
