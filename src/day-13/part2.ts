import { assert } from "console";
import { readInput } from "../utils";

type fold = [orientation: "x" | "y", placement: number];

function print(paper: number[][], fold?: fold): void {
  const dot = (digit: number) => (digit ? "#" : ".");
  paper.forEach((row, y) => {
    console.log(
      row
        .map((col, x) => {
          if (fold) {
            if (fold[0] == "y" && fold[1] == y) {
              return "-";
            } else if (fold[0] == "x" && fold[1] == x) {
              return "|";
            }
          }
          return dot(col);
        })
        .join("")
    );
  });
}

const lines = readInput(__dirname);
const split = lines.findIndex((l) => l.trim().length == 0);

const dots: [number, number][] = lines
  .slice(0, split)
  .map((l) => l.split(",").map(Number));
const width = Math.max(...dots.map(([x, y]) => x));
const height = Math.max(...dots.map(([x, y]) => y));

const paper: number[][] = Array.from({ length: height + 1 }, (e) =>
  Array(width + 1).fill(0)
);
dots.forEach(([x, y]) => (paper[y][x] = 1));

console.log(`Paper ${width}x${height}`);

const instructions = lines
  .slice(split + 1, lines.length)
  .map((l) => l.split("fold along ")[1]);
const folds: fold[] = instructions.map((i) => i.split("="));

function doFold(paper: number[][], instruction: fold): number[][] {
  function foldY(paper: number[][], y: number): number[][] {
    y = parseInt(y.toString(), 10); // for some reason it was treating y a as string
    const top = paper.slice(0, y);
    const bottom = paper.slice(y + 1);
    if (top.length !== bottom.length) {
      bottom.push(Array(top[0].length).fill(0));
    }
    bottom.reverse();
    return top.map((row, y) => row.map((col, x) => col | bottom[y][x]));
  }
  function foldX(paper: number[][], x: number): number[][] {
    x = parseInt(x.toString(), 10); // for some reason it was treating x a as string
    const left = paper.map((row) => row.slice(0, x));
    const right = paper.map((row) => row.slice(x + 1));
    right.map((row) => row.reverse());
    assert(left.length === right.length);
    return left.map((row, y) => row.map((col, x) => col | right[y][x]));
  }
  return instruction[0] == "x"
    ? foldX(paper, instruction[1])
    : foldY(paper, instruction[1]);
}
console.log("\nResults");
let result = paper;
folds.forEach((f, i) => {
  console.log("Fold ", instructions[i]);
  result = doFold(result, f);
});
print(result);
