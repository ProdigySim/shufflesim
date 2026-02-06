#!/bin/bash
set -e

mkdir -p results
pushd results
for i in {0,1,2,3,4,5,6,7,8,9,10}; do
  echo "Generating 10k_7pile${i}shuffle.json"
  deno run -A ../pileriffle.ts 7 $i > "10k_7pile${i}shuffle.json";
done
for i in {0,1,2,3,4,5,6,7,8,9,10}; do
  echo "Generating 10k_7stablepile${i}shuffle.json"
  deno run -A ../stablepileriffle.ts 7 $i > "10k_7stablepile${i}shuffle.json";
done

for i in {0,1,2,3,4,5,6,7,8,9,10}; do
  echo "Generating 10k_7pile${i}shuffle.png"
  deno run -A ../bitmapify.ts "10k_7pile${i}shuffle.json";
done
for i in {0,1,2,3,4,5,6,7,8,9,10}; do
  echo "Generating 10k_7stablepile${i}shuffle.png"
  deno run -A ../bitmapify.ts "10k_7stablepile${i}shuffle.json";
done

popd