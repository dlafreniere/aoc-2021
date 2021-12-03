import { readInput } from "../utils";

type direction = "forward" | "up" | "down";

interface move {
  direction: direction;
  amount: number;
}

const parseMove = (line: string): move => {
  const parts = line.split(" ");
  return {
    direction: parts[0] as direction,
    amount: parseInt(parts[1], 10),
  };
};

const moves = readInput(__dirname).map(parseMove);

let [x, y] = [0, 0];
let aim = 0;

moves.forEach((move) => {
  switch (move.direction) {
    case "forward":
      x += move.amount;
      y += aim * move.amount;
      break;
    case "up":
      aim -= move.amount;
      break;
    case "down":
      aim += move.amount;
      break;
  }
});

console.log(x * y);
