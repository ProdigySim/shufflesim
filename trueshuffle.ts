// https://stackoverflow.com/a/12646864
function trueShuffle(array: Array<number>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function toTrueShuffled(array: ReadonlyArray<number>) {
  const newDeck = [...array];
  trueShuffle(newDeck);
  return newDeck;
}

if(import.meta.main) {
  const INITIAL_CARDS: ReadonlyArray<number> = new Array(60).fill(0).map((x,idx) => idx);

  const ITERATIONS = parseInt(Deno.args[0] ?? '10000', 10);
  // poor man's streaming json
  console.log("[")
  for(let i = 0; i < ITERATIONS; i++) {
    console.log(
      JSON.stringify(toTrueShuffled(INITIAL_CARDS))
      + (i === ITERATIONS-1 ? '' : ',')
    );
  }
  console.log("]")
}