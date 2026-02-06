import { randomPileShuffle, riffleshuffleN } from './shufflelogic.ts';

if(import.meta.main) {
  const INITIAL_CARDS: ReadonlyArray<number> = new Array(60).fill(0).map((x,idx) => idx);

  const PILECOUNT = parseInt(Deno.args[0] ?? '7', 10);
  const SHUFFLECOUNT = parseInt(Deno.args[1] ?? '1', 10);
  const ITERATIONS = parseInt(Deno.args[2] ?? '10000', 10);
  // poor man's streaming json
  console.log("[")
  for(let i = 0; i < ITERATIONS; i++) {
    console.log(
      JSON.stringify(riffleshuffleN(randomPileShuffle(INITIAL_CARDS, PILECOUNT), SHUFFLECOUNT)) 
      + (i === ITERATIONS-1 ? '' : ',')
    );
  }
  console.log("]")
}