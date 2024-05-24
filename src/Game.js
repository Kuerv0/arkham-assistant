import allies from './data/base-game/investigator-cards/allies.json'
import common from './data/base-game/investigator-cards/common-items.json'
import skills from './data/base-game/investigator-cards/skills.json'
import special from './data/base-game/investigator-cards/special-cards.json'
import spells from './data/base-game/investigator-cards/spells.json'
import unique from './data/base-game/investigator-cards/unique-items.json'
import investigators from './data/base-game/investigator-cards/investigators.json'

import mythos from './data/base-game/ancient-one-cards/mythos-cards.json'
import gate from './data/base-game/ancient-one-cards/gate-cards.json'
// import locations from 
import gods from './data/base-game/ancient-one-cards/ancient-ones.json'

export const ArkhamHorror = {
  setup: ( {G, ctx} ) => ({
    investigatorSheets : deckBuilder(investigators["Investigators"]),
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

    ancientOneSheets : deckBuilder(gods["Ancient Ones"]),
    locationCards : {},
    mythosCards : deckBuilder(mythos["Mythos Cards"]),
    gateCards : deckBuilder(gate["Gate Cards"]),

    mythosEnv: {},
    mythosRum: {},
    mythosLast: {},

    gateLast: {},

    box: [],

    players : playerBuilder(ctx.numPlayers)
  }),

  moves: {
    searchCard: ( {G, ctx}, name, deck ) => {
      let array = G[deck]
      for (let i = 0; i < array.length; i++){
        if (name === array[i]["name"]){
          let card = array[i]

          G.players[ctx["currentPlayer"]][deck].push(card)
          array.splice(i, 1)
          break
        }
      }
    },

    drawCard: ( {G, ctx}, deck ) => {
      let card = G[deck].pop()
      G.players[ctx["currentPlayer"]][deck].push(card)
    },

    discardCard: ({G, ctx}, name, deck) => {
      let array = G.players[ctx["currentPlayer"]][deck]
      for (let i = 0; i < array.length; i++){
        if (name === array[i]["name"]){
          let card = array[i]
          G[deck].unshift(card)

          array.splice(i, 1)
          break
        }
      }
    },

//    drawInvestigator: ( {G, ctx, moves} ) => {
//      let investigator = G.players[ctx["currentPlayer"]]["investigator"]
//      let card = G["investigatorSheets"].pop()
//      investigator = card
//    },

    drawMythos: ( {G, ctx, moves} ) => {
      let card = G["mythosCards"].pop()

      G["mythosLast"] = card

      if (card.type.includes("Environment")){
        if (typeof G["mythosEnv"]["name"] !== 'undefined'){
          G["mythosCards"].unshift(G["mythosEnv"])
        }
        G["mythosEnv"] = card
      } else if (card.type.includes("Rumor")){
        if (typeof G["mythosRum"]["name"] === 'undefined'){
          G["mythosRum"] = card
        }
        G['mythosCards'].unshift(card)
      } else {
        G['mythosCards'].unshift(card)
      }
    },

    resolveRumor: ( {G, ctx, moves} ) => {
      let card = G["mythosRum"]
      G["mythosRum"] = {}
      G.box.push(card)
    },

    drawGate: ( {G, ctx, moves} ) => {
      let card = G["gateCards"].pop()
      G["gateLast"] = card
      G["gateCards"].unshift(card)
    }
  },

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
  while (currentIndex != 0){
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

function playerBuilder(number) {
  let array = []
  for (let i = 0; i < number; i++){
    let player = {
      commonItems: [],
      uniqueItems: [],
      spells: [],
      skills: [],
      allies: [],
      retainer: false,
      membership: false,
      loan: false,
      blessing: false,
      curse: false,
      deputy: [],
      investigator: {},
    }
    array.push(player)
  }
  return array
}
