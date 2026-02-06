import { stablePileShuffle, riffleshuffleN } from './shufflelogic.ts';

if(import.meta.main) {
  const PILECOUNT = parseInt(Deno.args[0] ?? '7', 10);
  const SHUFFLECOUNT = parseInt(Deno.args[1] ?? '1', 10);
  const ITERATIONS = parseInt(Deno.args[2] ?? '10000', 10);
  const INITIAL_CARDS: ReadonlyArray<number> = stablePileShuffle(new Array(60).fill(0).map((x,idx) => idx), PILECOUNT);
  // poor man's streaming json
  console.log("[")
  for(let i = 0; i < ITERATIONS; i++) {
    console.log(
      JSON.stringify(riffleshuffleN(INITIAL_CARDS, SHUFFLECOUNT)) 
      + (i === ITERATIONS-1 ? '' : ',')
    );
  }
  console.log("]")
}