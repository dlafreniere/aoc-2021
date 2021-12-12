import { readInput } from "../utils";

const outputs: string[] = readInput(__dirname)
  .map((line: string) => line.split(" | ")[1])
  .flatMap((outs: string) => outs.split(" "));

const uniquePatterns: { [length: number]: number } = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

let count = 0;
outputs.forEach((s) => {
  if (uniquePatterns[s.length]) {
    ++count;
  }
});

console.log(
  `here are ${count} instances of digits that use a unique number of segments`
);
