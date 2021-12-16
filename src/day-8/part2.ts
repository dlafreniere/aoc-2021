import { access } from "fs";
import { readInput } from "../utils";

const lines: string[][] = readInput(__dirname).map((line: string) =>
  line.split(" | ")
);

const segments: { [segment: string]: number } = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

const uniquePatternLengths: { [length: number]: number } = {
  2: 1,
  4: 4,
  3: 7,
  7: 8,
};

let sum = 0;
for (const line of lines) {
  const signals = line[0].split(" ");
  const outputs = line[1].split(" ");

  const mappings: { [number: number]: string } = {};
  const toBeSolved: string[] = [];

  signals.forEach((signal) => {
    const pattern = uniquePatternLengths[signal.length];
    if (pattern !== undefined) {
      mappings[pattern] = signal;
    } else {
      toBeSolved.push(signal);
    }
  });

  const [corf1, corf2] = mappings[1];

  const seven = mappings[7];
  const a = seven.replace(corf1, "").replace(corf2, "");

  const [bord1, bord2] = mappings[4].replace(corf1, "").replace(corf2, "");

  const maybe235 = toBeSolved.filter((s) => s.length === 5);

  let b: string = "";
  let c: string = "";
  let d: string = "";
  let f: string = "";
  let g: string = "";

  const [maybe51] = maybe235
    .map((s) =>
      s.replace(a, "").replace(bord1, "").replace(bord2, "").replace(corf1, "")
    )
    .filter((m) => m.length === 1);
  if (maybe51) {
    g = maybe51;
    f = corf1;
    c = corf2;
  } else {
    const [maybe52] = maybe235
      .map((s) =>
        s
          .replace(a, "")
          .replace(bord1, "")
          .replace(bord2, "")
          .replace(corf2, "")
      )
      .filter((m) => m.length === 1);
    if (maybe52) {
      g = maybe52;
      f = corf2;
      c = corf1;
    }
  }
  const [maybe31] = maybe235
    .map((s) =>
      s.replace(a, "").replace(c, "").replace(bord1, "").replace(f, "")
    )
    .filter((m) => m.length === 1);
  if (maybe31) {
    g = maybe31;
    d = bord1;
    b = bord2;
  } else {
    const [maybe32] = maybe235
      .map((s) =>
        s.replace(a, "").replace(c, "").replace(bord2, "").replace(f, "")
      )
      .filter((m) => m.length === 1);
    if (maybe32) {
      g = maybe32;
      d = bord2;
      b = bord1;
    }
  }

  const e = mappings[8]
    .replace(a, "")
    .replace(b, "")
    .replace(c, "")
    .replace(d, "")
    .replace(f, "")
    .replace(g, "");

  const segmentMappings: { [segment: string]: string } = {
    [a]: "a",
    [b]: "b",
    [c]: "c",
    [d]: "d",
    [e]: "e",
    [f]: "f",
    [g]: "g",
  };
  console.log("Mappings: ", segmentMappings);
  let answer: string = "";
  for (const output of outputs) {
    const mapped = output
      .split("")
      .map((s) => segmentMappings[s])
      .sort()
      .join("");
    const num = segments[mapped];
    console.log(`${output} -> ${mapped}: ${num}`);
    answer += num.toString();
  }
  console.log("Answer: ", answer);
  sum += parseInt(answer, 10);
}
console.log(
  `Adding all of the output values in this larger example produces ${sum}.`
);
