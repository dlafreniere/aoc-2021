import { assert } from "console";
import fs from "fs";
import path from "path";

export function readInput(dir: string): any[] {
  const inputs = readRawInput(dir)
    .split("\n");
  assert(inputs.length > 0);
  return inputs;
}

export function readRawInput(dir: string): string {
    return fs
      .readFileSync(path.resolve(dir, "input.txt"))
      .toString();
  }