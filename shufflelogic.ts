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
export function riffleshuffleN(deck: ReadonlyArray<number>, count: number) {
  while (count--) {
    deck = riffleshuffle(deck);
  }
  return deck;
}

// https://stackoverflow.com/a/12646864
function trueShuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function toTrueShuffled<T>(array: ReadonlyArray<T>) {
  const newDeck = [...array];
  trueShuffle(newDeck);
  return newDeck;
}


export function randomPileShuffle(deck: ReadonlyArray<number>, pileCount: number) {
  const piles = new Array(pileCount).fill(0).map(_ => new Array<number>());
  for(let i = 0; i < deck.length; i++) {
    piles[i % pileCount].push(deck[i]);
  }

  return toTrueShuffled(piles).flat();
}
export function stablePileShuffle(deck: ReadonlyArray<number>, pileCount: number) {
  const piles = new Array(pileCount).fill(0).map(_ => new Array<number>());
  for(let i = 0; i < deck.length; i++) {
    piles[i % pileCount].push(deck[i]);
  }
  const outDeck = new Array<number>();
  // Stack piles middle, outer, middle, counter-outer, middle, counter-outer....
  // VERY MEDIOCRE SIMULATION but it needs to stay stable.
  let i =0;
  while(piles.length) {
    switch(i % 4) {
      case 0:
      case 2: 
        outDeck.push(...piles.splice(Math.floor(piles.length/2), 1)[0]);
        break;
      case 1: 
        outDeck.push(...piles.splice(piles.length-1, 1)[0]);
        break;
      case 3: 
        outDeck.push(...piles.splice(0, 1)[0]); 
        break;
    }
    i++;
  }
  return outDeck;
}