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

  private isLowPoint(l: Location): boolean {
    const up = this.at(l.x, l.y - 1);
    const down = this.at(l.x, l.y + 1);
    const left = this.at(l.x - 1, l.y);
    const right = this.at(l.x + 1, l.y);
    return [up, down, left, right].every(
      (p) => p === undefined || p.height > l.height
    );
  }

  private risk(location: Location): number {
    if (this.isLowPoint(location)) {
      return location.height + 1;
    }
    return 0;
  }

  public totalRisk(): number {
    return this.locations.reduce((sum, cur) => (sum += this.risk(cur)), 0);
  }
}

const grid: number[][] = readInput(__dirname).map((line) =>
  line.split("").map(Number)
);

const heightmap = new HeightMap(grid);
console.log(
  `The sum of the risk levels of all low points in the heightmap is therefore ${heightmap.totalRisk()}`
);
