import { readRawInput } from "../utils";

const positions = readRawInput(__dirname).split(",").map(Number);

let counts: { [position: number]: number } = {};
for (const p of positions) {
  counts[p] = (counts[p] || 0) + 1;
}

let costs: { [position: number]: number } = {};
const uniquePositions = Object.keys(counts).map(Number);
for (const position of uniquePositions) {
  let cost: number = 0;
  for (const p of uniquePositions) {
    cost += Math.abs(p - position) * counts[p];
  }
  costs[position] = cost;
}

const cheapest = Object.values(costs)
  .sort((a, b) => a - b)
  .shift();
console.log(
  `This costs a total of ${cheapest} fuel. This is the cheapest possible outcome`
);
