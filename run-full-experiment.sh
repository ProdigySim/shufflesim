#!/bin/bash
set -e

for i in {0,1,2,3,4,5,6,7,8,9,10}; do
  echo "Generating 10k_${i}shuffle.json"
  deno run -A nriffles.ts $i > "10k_${i}shuffle.json";
done

echo "Generating 10k_trueshuffle.json"
deno run -A trueshuffle.ts > 10k_trueshuffle.json

for i in {0,1,2,3,4,5,6,7,8,9,10}; do
  echo "Generating 10k_${i}shuffle.png"
  deno run -A bitmapify.ts "10k_${i}shuffle.json";
done

echo "Generating 10k_trueshuffle.png"
  deno run -A bitmapify.ts "10k_trueshuffle.json";
