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

const dst = new PNG({ width: DIMENSION, height: DIMENSION});

for (let y=0; y < dst.height; y++) {
  for (let x = 0; x < dst.width; x++) {
    const idx = (dst.width * y + x) << 2;
    // console.log(idx, normalized[y][x] * 255);
    dst.data[idx+3] = normalized[y][x] * 255;
  }
}
dst.pack().pipe(fs.createWriteStream(INFILE.replace(".json", ".png")));