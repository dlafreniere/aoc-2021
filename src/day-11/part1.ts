import { readInput } from "../utils";

class Octopus {
  public flashed = false;
  constructor(public x: number, public y: number, public energy: number) {}
}

class Grid {
  octopii: Octopus[][] = [];
  private width: number;
  private height: number;

  constructor(grid: number[][]) {
    this.height = grid.length;
    this.width = grid[0].length;
    grid.forEach((row, y) => {
      const r: Octopus[] = [];
      row.forEach((column, x) => {
        r.push(new Octopus(x, y, column));
      });
      this.octopii.push(r);
    });
  }

  private at(x: number, y: number): Octopus | undefined {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return;
    } else {
      return this.octopii[y][x];
    }
  }

  private neighbours(o: Octopus): Octopus[] {
    const w = this.at(o.x - 1, o.y);
    const nw = this.at(o.x - 1, o.y - 1);
    const n = this.at(o.x, o.y - 1);
    const ne = this.at(o.x + 1, o.y - 1);
    const e = this.at(o.x + 1, o.y);
    const se = this.at(o.x + 1, o.y + 1);
    const s = this.at(o.x, o.y + 1);
    const sw = this.at(o.x - 1, o.y + 1);
    return [w, nw, n, ne, e, se, s, sw].filter((n) => n) as Octopus[];
  }

  public step(): number {
    let flashes = 0;
    this.octopii.forEach((row) => row.forEach((o) => o.energy++));

    const handleFlash = (octopus: Octopus) => {
      if (octopus.energy > 9 && !octopus.flashed) {
        flash(octopus);
        return true;
      }
      return false;
    };
    const flash = (octopus: Octopus) => {
      octopus.flashed = true;
      this.neighbours(octopus).forEach((n) => {
        n.energy++;
      });
    };

    while (this.octopii.flat().some((o) => handleFlash(o)));

    this.octopii.forEach((row) =>
      row.forEach((o) => {
        if (o.flashed) {
          o.energy = 0;
          ++flashes;
        }
        o.flashed = false;
      })
    );
    return flashes;
  }

  public print(): void {
    this.octopii.forEach((row) => {
      console.log(row.map((o) => o.energy).join(""));
    });
  }
}

const rawNumbers: number[][] = readInput(__dirname).map((line) =>
  line.split("").map(Number)
);

const grid = new Grid(rawNumbers);
const steps = 100;
let flashes = 0;
console.log("Before any steps:");
grid.print();
for (let i = 1; i <= steps; ++i) {
  if (i < 10 || i % 10 == 0) {
    console.log(`\nAfter step ${i}`);
    grid.print();
  }
  flashes += grid.step();
}

console.log(
  `After ${steps} steps, there have been a total of ${flashes} flashes.`
);
