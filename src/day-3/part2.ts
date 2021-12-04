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

const leastCommon = (counts: bitCount): bitString =>
  counts["0"] < counts["1"] ? "0" : "1";

const getReading = (favor1: boolean) => {
  let toKeep = lines;
  for (let col = 0; col < cols; ++col) {
    const bits = toKeep.map((l) => l[col]);
    const counts = bitCount(bits);

    let common = favor1 ? mostCommon(counts) : leastCommon(counts);
    if (counts["0"] === counts["1"]) {
      common = favor1 ? "1" : "0";
    }
    console.log(JSON.stringify(counts));
    console.log(`col ${col} - ${common}`);
    toKeep = toKeep.filter((l) => l[col] === common);
    console.log(JSON.stringify(toKeep));
    if (toKeep.length === 1) {
      console.log(parseInt(toKeep[0], 2));
      return toKeep[0];
    }
  }
};
const oxygen = getReading(true);
const co2 = getReading(false);
console.log(`oxygen [${oxygen}] co2 [${co2}]`);
console.log(parseInt(oxygen, 2) * parseInt(co2, 2));
