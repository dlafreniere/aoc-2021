import { readInput } from "../utils";

const lines = readInput(__dirname);

type bitString = "0" | "1";
type bitCount = { [key in bitString]: number };

const cols = lines[0].trim().length;

const bitCount = (array: bitString[]) => {
  const counts: bitCount = { "0": 0, "1": 0 };
  array.forEach((b) => {
    counts[b] = ++counts[b];
  });
  return counts;
};

const mostCommon = (counts: bitCount): bitString =>
  counts["0"] > counts["1"] ? "0" : "1";

const bitComplement = (s: string): string =>
  s
    .split("")
    .map((x) => (x === "1" ? "0" : "1"))
    .join("");

let gamma: string = "";
for (let col = 0; col < cols; ++col) {
  const bits = lines.map((l) => l[col]);
  const counts = bitCount(bits);

  gamma += mostCommon(counts);
}
let epsilon = bitComplement(gamma);

console.log(`gamma [${gamma}] epsilon [${epsilon}]`);
console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
