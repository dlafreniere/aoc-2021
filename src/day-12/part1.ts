import { readInput } from "../utils";

class Cave {
  public connections: Cave[] = [];
  public big = this.name === this.name.toUpperCase();
  constructor(public name: string) {}
}

const paths: string[][] = readInput(__dirname).map((path) => path.split("-"));
const caves: { [key: string]: Cave } = {};
paths.forEach(([start, end]) => {
  const s = caves[start] || new Cave(start);
  const e = caves[end] || new Cave(end);
  s.connections.push(e);
  e.connections.push(s);
  caves[start] = s;
  caves[end] = e;
});

const possiblePaths = new Set<string[]>();
const pathsToExplore = [[caves["start"].name]];
while (pathsToExplore.length > 0) {
  const path = pathsToExplore.pop() as string[];
  let current: Cave;
  while ((current = caves[path[path.length - 1]]).name !== "end") {
    let possibilities = current.connections
      .filter((c) => c.name !== "start")
      .filter((p) => p.big || !path.includes(p.name));
    if (possibilities.length === 0) {
      break;
    }
    const next = possibilities.shift() as Cave;
    while (possibilities.length > 0) {
      pathsToExplore.push([...path, (possibilities.shift() as Cave).name]);
    }
    path.push(next.name);
  }
  if (current.name === "end") {
    possiblePaths.add(path);
  }
}

possiblePaths.forEach((path) => {
  console.log(path.join(","));
});
console.log(`there are ${possiblePaths.size} paths through this cave system:`);
