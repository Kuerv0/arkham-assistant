import allies from './data/base-game/investigator-cards/allies.json'
import common from './data/base-game/investigator-cards/common-items.json'
import skills from './data/base-game/investigator-cards/skills.json'
import special from './data/base-game/investigator-cards/special-cards.json'
import spells from './data/base-game/investigator-cards/spells.json'
import unique from './data/base-game/investigator-cards/unique-items.json'

import mythos from './data/base-game/ancient-one-cards/mythos-cards.json'
import gate from './data/base-game/ancient-one-cards/gate-cards.json'

export const ArkhamHorror = {
  setup: () => ({
    investigatorSheets : {},
    commonItems : deckBuilder(common["Common Items"]),
    uniqueItems : deckBuilder(unique["Unique Items"]),
    spells : deckBuilder(spells["Spells"]),
    skills : deckBuilder(skills["Skills"]),
    allies : deckBuilder(allies["Allies"]),
    retainers : deckBuilder(special["Retainers"]),
    LodgeMemberships : deckBuilder(special["Silver Twilight Lodge Memberships"]),
    bankLoans : deckBuilder(special["Bank Loans"]),
    blessing : deckBuilder(special["Blessings"]),
    curse : deckBuilder(special["Curses"]),
    deputy : deckBuilder(special["Deputy"]),

    ancientOneSheets : {},
    locationCards : {},
    mythosCards : deckBuilder(mythos["Mythos Cards"]),
    gateCards : deckBuilder(gate["Gate Cards"]),
  }),

  phases: {
    upkeep: {
      moves: {},
      next: 'movement'
    },

    movement: {
      moves: {},
      next: 'arkhamEncounters'
    },

    arkhamEncounters: {
      moves: {},
      next: 'otherWorldEncounters'
    },

    otherWorldEncounters: {
      moves: {},
      next: 'mythos'
    },

    mythos: {
      moves: {},
      next: 'upkeep'
    },
  }
}

function deckBuilder(data){
  let cards = []
  for (let i in data){
    let count = 1
    if (typeof data[i]["count"] !== 'undefined') {count = data[i]["count"]}

    for (let t = 0; t < count; t++){
      cards.push(data[i])
    }
  }

  shuffle(cards);
  return cards;
}  

function shuffle(array){
  let currentIndex = array.length;

  //while there remain elements to shuffle...
  while (currentIndex != 0){
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}
