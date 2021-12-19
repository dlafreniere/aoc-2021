import { readInput } from "../utils";

const SCORES: {[char: string]: number} = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const OPEN = ["(", "[", "{", "<"];
const CLOSE = [")", "]", "}", ">"];

const lines: string[] = readInput(__dirname);

const opens: string[] = [];
const illegals: string[] = [];
lines.forEach((line) => {
  line.split("").forEach((char) => {
    if (OPEN.includes(char)) {
      opens.push(char);
    } else if (CLOSE.includes(char)) {
      const opener: string = opens.pop() as string;
      const oindex: number = OPEN.indexOf(opener);
      const cindex: number = CLOSE.indexOf(char);

      if (oindex !== cindex) {
        console.log(`Expected ${CLOSE[oindex]} but found ${char} instead`);
        illegals.push(char);
      }
    }
  });
});

const points = illegals.reduce((sum, illegal) => sum += SCORES[illegal], 0);
console.log(`So, the total syntax error score for this file is ${points} points!`)