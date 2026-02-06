import { PNG } from 'npm:pngjs';
import fs from 'node:fs';

const INFILE = Deno.args[0];
const data: ReadonlyArray<ReadonlyArray<number>> = JSON.parse(await Deno.readTextFile(INFILE));


// infer dimensions
const DIMENSION = data[0].length;
const aggregate = new Array(DIMENSION).fill(0).map(_x => new Array(DIMENSION).fill(0));

for(const result of data) {
  result.forEach((number, idx) => {
    aggregate[number][idx]++;
  });
}
// console.log(aggregate);

const max = aggregate.reduce((acc, next) => {
  return next.reduce((acc, next) => {
    return Math.max(acc, next);
  }, acc);
}, 0);
const min = aggregate.reduce((acc, next) => {
  return next.reduce((acc, next) => {
    return Math.min(acc, next);
  }, acc);
}, Infinity);

console.log("Min:", min, "Max:", max);
const normalized = aggregate.map(col => col.map(x => x/max));

// console.log(normalized);

function writePixel(dst: PNG, y: number, x: number, value: number) {
  // Got this math from pngjs readme
  const idx = (dst.width * y + x) << 2;
  // Write only alpha channel--other channels are 0
  dst.data[idx+3] = value;
}
// 4x integer scaling
const dst = new PNG({ width: DIMENSION * 4, height: DIMENSION * 4});
for (let y=0; y < DIMENSION; y++) {
  for (let x = 0; x < DIMENSION; x++) {
    const value = normalized[y][x] * 255;
    // write a 4x4 square in the output
    for(let yOffset = 0; yOffset < 4; yOffset++) {
      for(let xOffset = 0; xOffset < 4; xOffset++) {
        writePixel(dst, (4*y)+yOffset, (4*x)+xOffset, value);
      }
    }
  }
}
dst.pack().pipe(fs.createWriteStream(INFILE.replace(".json", ".png")));