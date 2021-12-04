import { readRawInput } from "../utils";

const body = readRawInput(__dirname);
const parts = body.split("\n\n");

class Board {
  private rows: string[][];
  private columns: string[][];
  private drawn: string[] = [];

  private transpose = (matrix: any[][]) => {
    let [row] = matrix;
    return row.map((ignored, column) => matrix.map((row) => row[column]));
  };

  constructor(s: string, public id: number) {
    this.rows = s.split("\n").map((r) => r.trim().split(/\s+/));
    this.columns = this.transpose(this.rows);
  }

  draw(val: string): void {
    this.drawn.push(val);
  }

  isWin(): boolean {
    return (
      this.rows.some((r) => r.every((v) => this.drawn.includes(v))) ||
      this.columns.some((r) => r.every((v) => this.drawn.includes(v)))
    );
  }

  score(): number {
    const unmarked = this.rows
      .map((r) => r.filter((v) => !this.drawn.includes(v)))
      .flat();
    const sum = unmarked
      .map((n) => parseInt(n, 10))
      .reduce((sum, i) => sum + i, 0);
    return sum * parseInt(this.drawn[this.drawn.length - 1], 10);
  }
}

const numbers = parts[0].split(",");
const boards = parts.slice(1);

const bb: Board[] = boards.map((b, i) => new Board(b, i));

numbers.some((n) => {
  console.log(`Drawing.... ${n}`);
  return bb.some((b) => {
    b.draw(n);
    const won = b.isWin();
    if (won) {
      console.log(`Winner! ${b.id}`);
      console.log(b.score());
    }
    return won;
  });
});
