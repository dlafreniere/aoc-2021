import { readInput } from "../utils";

const SCORES: { [char: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

const OPEN = ["(", "[", "{", "<"];
const CLOSE = [")", "]", "}", ">"];

const lines: string[] = readInput(__dirname);

const scores: number[] = [];
lines.forEach((line) => {
  const opens: string[] = [];
  let corrupt = false;
  line.split("").forEach((char) => {
    if (OPEN.includes(char)) {
      opens.push(char);
    } else if (CLOSE.includes(char)) {
      const opener: string = opens.pop() as string;
      const oindex: number = OPEN.indexOf(opener);
      const cindex: number = CLOSE.indexOf(char);

      if (oindex !== cindex) {
        corrupt = true;
      }
    }
  });
  if (!corrupt) {
    const missing = opens.reverse().map((open) => CLOSE[OPEN.indexOf(open)]);
    const score = missing.reduce(
      (acc, cur) => (acc = acc * 5 + SCORES[cur]),
      0
    );
    console.log(
      `${line} - Complete by adding ${missing.join("")} - ${score} total points`
    );
    scores.push(score);
  }
});

const middle = scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
console.log("The middle score is", middle);
