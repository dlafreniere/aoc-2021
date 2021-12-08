import { readInput } from "../utils";

class Point {
  constructor(public x: number, public y: number) {}
  static parse(s: string[]) {
    const x = parseInt(s[0], 10);
    const y = parseInt(s[1], 10);
    return new Point(x, y);
  }
  static compare = (a: number, b: number) => a - b;
}

class Vent {
  constructor(public start: Point, public end: Point) {}

  isDiagonal() {
    return this.start.x !== this.end.x && this.start.y !== this.end.y;
  }

  isHorizontal() {
    return this.start.y === this.end.y;
  }

  isVertical() {
    return this.start.x === this.end.x;
  }

  points(): Point[] {
    const points: Point[] = [];
    if (this.isHorizontal()) {
      let xs = [this.start.x, this.end.x].sort(Point.compare);
      for (let x = xs[0]; x <= xs[1]; ++x) {
        points.push(new Point(x, this.start.y));
      }
    } else if (this.isVertical()) {
      let ys = [this.start.y, this.end.y].sort(Point.compare);
      for (let y = ys[0]; y <= ys[1]; ++y) {
        points.push(new Point(this.start.x, y));
      }
    } else {
      let [left, right] = [this.start, this.end].sort((a, b) => a.x - b.x);
      let operator = left.y < right.y ? +1 : -1;

      for (let x = left.x, y = left.y; x <= right.x; ++x, y += operator) {
        points.push(new Point(x, y));
      }
    }
    return points;
  }
}

const lines = readInput(__dirname);
let vents: Vent[] = lines.map((line) => {
  let [s, e] = line.split(" -> ");
  return new Vent(Point.parse(s.split(",")), Point.parse(e.split(",")));
});

let maxX = Math.max(...vents.flatMap((v) => [v.start.x, v.end.x]));
let maxY = Math.max(...vents.flatMap((v) => [v.start.y, v.end.y]));

const diagram: number[][] = [];
for (let x = 0; x <= maxX; ++x) {
  diagram[x] = [];
  for (let y = 0; y <= maxY; ++y) {
    diagram[x][y] = 0;
  }
}
const allPoints = vents.flatMap((v) => v.points());

allPoints.forEach((p) => {
  const current = diagram[p.x][p.y];
  diagram[p.x][p.y] = current + 1;
});

let score = 0;
for (let y = 0; y <= maxY; ++y) {
  let line = "";
  for (let x = 0; x <= maxX; ++x) {
    const current = diagram[x][y];
    if (current >= 2) {
      ++score;
    }
    line += current === 0 ? "." : current.toString();
  }
  console.log(line);
}

console.log("Score: " + score);
