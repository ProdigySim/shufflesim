function randBool(): boolean {
  // Math.random returns [0,1) so <0.5 is correct for 50% chance
  return Math.random() < 0.5;
}
// Cut a deck perfectly in two
function split(deck: ReadonlyArray<number>) {
  const left = deck.slice(0, deck.length / 2);
  const right = deck.slice(deck.length / 2);
  return [left, right] as const;
}

// Riffle shuffle a deck
function riffleshuffle(deck: ReadonlyArray<number>) {
  // Note: This is a perfect split of the deck in half.
  // Normal players would have a normal distribution of deck splits here.
  const [left, right] = split(deck);
  const newDeck: number[] = [];

  while (left.length || right.length) {
    // NOTE: Being careful to match final push of cards ordering with single card pull ordering.

    // If either deck is out, just slam the rest of the deck on top
    if (!left.length) return [...newDeck, ...right];
    if (!right.length) return [...newDeck, ...left];
    // Randomly pick a deck to pull a card from.
    if (randBool() === true) {
      // take from left next
      newDeck.push(left.shift()!);
    } else {
      newDeck.push(right.shift()!);
    }
  }
  return newDeck;
}
// Riffle shuffle a deck N tmes in a row
function riffleshuffleN(deck: ReadonlyArray<number>, count: number) {
  while (count--) {
    deck = riffleshuffle(deck);
  }
  return deck;
}

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