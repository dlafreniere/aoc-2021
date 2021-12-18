import { createThis } from "typescript";
import { readInput } from "../utils";

class Location {
  constructor(public x: number, public y: number, public height: number) {}
}

class HeightMap {
  locations: Location[] = [];
  private width: number;
  private height: number;

  constructor(grid: number[][]) {
    this.height = grid.length;
    this.width = grid[0].length;
    grid.forEach((row, y) => {
      row.forEach((column, x) => {
        this.locations.push(new Location(x, y, column));
      });
    });
  }

  private at(x: number, y: number): Location | undefined {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
      return;
    } else {
      return this.locations[y * this.width + x];
    }
  }

  private neighbours(l: Location): Array<Location | undefined> {
    const up = this.at(l.x, l.y - 1);
    const down = this.at(l.x, l.y + 1);
    const left = this.at(l.x - 1, l.y);
    const right = this.at(l.x + 1, l.y);
    return [up, down, left, right];
  }

  private isLowPoint(l: Location): boolean {
    return this.neighbours(l).every(
      (p) => p === undefined || p.height > l.height
    );
  }

  private basinSize(lowPoint: Location): number {
    const basin = [lowPoint];
    const search = (l: Location, basin: Location[]): Location[] => {
      this.neighbours(l).forEach((n) => {
        if (n !== undefined && !basin.includes(n)) {
          if (n.height !== 9) {
            basin.push(n);
            search(n, basin);
          }
        }
      });
      return basin;
    };
    search(lowPoint, basin);
    return basin.length;
  }

  public basins(): { lowPoint: Location; size: number }[] {
    return this.locations
      .filter((l) => this.isLowPoint(l))
      .map((lp) => ({ lowPoint: lp, size: this.basinSize(lp) }));
  }

  public print() {
    for (let i = 0; i < this.height; ++i) {
      const start = i * this.width;
      const row = this.locations.slice(start, start + this.width);
      console.log(
        row
          .map((l) => (this.isLowPoint(l) ? `(${l.height})` : ` ${l.height}`))
          .join("")
      );
    }
  }
}

const grid: number[][] = readInput(__dirname).map((line) =>
  line.split("").map(Number)
);

const heightmap = new HeightMap(grid);
const basins = heightmap.basins();
const answer = basins
  .map((b) => b.size)
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((total, size) => (total *= size), 1);
console.log(answer);
