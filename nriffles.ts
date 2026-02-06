import { riffleshuffleN } from './shufflelogic.ts';
if(import.meta.main) {
  const INITIAL_CARDS: ReadonlyArray<number> = new Array(60).fill(0).map((x,idx) => idx);

  const SHUFFLECOUNT = parseInt(Deno.args[0] ?? '1', 10);
  const ITERATIONS = parseInt(Deno.args[1] ?? '10000', 10);
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