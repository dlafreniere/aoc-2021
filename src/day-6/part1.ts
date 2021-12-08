import { readRawInput } from "../utils";

const initialState = readRawInput(__dirname)
  .split(",")
  .map((x) => parseInt(x, 10));

console.log(`Initial State: ${initialState}`);

let states: { [age: number]: number } = {};

for (const a of initialState) {
  states[a] = (states[a] || 0) + 1;
}

const DAYS = 80;

for (let d = 1; d <= DAYS; ++d) {
  const newStates: { [age: number]: number } = {};
  let reset = 0;
  for (const k of Object.keys(states).map(Number)) {
    switch (k) {
      case 0:
        reset = states[0];
        newStates[8] = states[0];
        break;
      default:
        newStates[k - 1] = states[k];
    }
  }
  newStates[6] = (newStates[6] || 0) + reset;
  states = newStates;
}

const total = Object.values(states).reduce((sum, cur) => (sum += cur), 0);

console.log(`After ${DAYS} days, there are a total of ${total} fish`);
