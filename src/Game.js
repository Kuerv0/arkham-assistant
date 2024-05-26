import { conversor } from './utilities'

import allies from './data/base-game/investigator-cards/allies.json'
import common from './data/base-game/investigator-cards/common-items.json'
import skills from './data/base-game/investigator-cards/skills.json'
import special from './data/base-game/investigator-cards/special-cards.json'
import spells from './data/base-game/investigator-cards/spells.json'
import unique from './data/base-game/investigator-cards/unique-items.json'
import investigators from './data/base-game/investigator-cards/investigators.json'

import mythos from './data/base-game/ancient-one-cards/mythos-cards.json'
import gate from './data/base-game/ancient-one-cards/gate-cards.json'
import locations from './data/base-game/ancient-one-cards/location-cards.json'
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
    mythosCards : deckBuilder(mythos["Mythos Cards"]),
    gateCards : deckBuilder(gate["Gate Cards"]),
    locationCards :{
      "Miskatonic University": deckBuilder(locations["Miskatonic University"]),
      "Downtown": deckBuilder(locations["Downtown"]),
      "Rivertown": deckBuilder(locations["Rivertown"]),
      "Northside": deckBuilder(locations["Northside"]),
      "Easttown": deckBuilder(locations["Easttown"]),
      "Southside": deckBuilder(locations["Southside"]),
      "French Hill": deckBuilder(locations["French Hill"]),
      "Merchant District": deckBuilder(locations["Merchant District"]),
      "Uptown": deckBuilder(locations["Uptown"]),
    },

    mythosEnv: {},
    mythosRum: {},
    mythosLast: {},

    locationLast: {},

    gateLast: {},

    ancientOne: { name: "No"},

    box: [],

    lastConversion: {},

    players : playerBuilder(ctx.numPlayers)
  }),

  moves: {
    searchCard: ( {G, ctx}, name, deck ) => {
      let array = G[deck]
      for (let i = 0; i < array.length; i++){
        if (array[i]["name"].includes(name)){
          let card = array[i]

          G.players[ctx["currentPlayer"]][deck].push(card)
          array.splice(i, 1)
          break
        }
      }
    },

    drawLocationCard: ( {G, ctx}, name ) => {
      G["locationLast"] = G["locationCards"][name][0]
      shuffle(G["locationCards"][name])
    },

    drawCard: ( {G, ctx, playerID}, deck ) => {
      console.log(playerID)
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
    },

    drawInvestigator: ( {G, ctx, moves} ) => {
      if ( G["players"][ctx["currentPlayer"]]["investigator"]["name"] === "No" ){
        let card = G["investigatorSheets"].pop()
        G["players"][ctx["currentPlayer"]]["investigator"] = card
      }
    },

    drawGod: ( {G, ctx, moves} ) => {
      if ( G["ancientOne"]["name"] === "No" ){
        let card = G["ancientOneSheets"].pop()
        G["ancientOne"] = card
      }
    },

    shuffleDeck: ( {G, ctx, moves}, name ) => {
      shuffle(G[name])
    },

    becomeDeputy: ( {G, ctx} ) => {
      for (let i = 0; i < 3; i++){
        G["players"][ctx["currentPlayer"]]["commonItems"].push(G["deputy"].pop())
      }
    },

    bless: ( {G, ctx, moves}) => {
      if (G["players"][ctx["currentPlayer"]]["blessing"] == 0){
        G["players"][ctx["currentPlayer"]]["blessing"] = 1
      } else {
        G["players"][ctx["currentPlayer"]]["blessing"] = 0
      }
    }, 

    curse: ( {G, ctx, moves}) => {
      if (G["players"][ctx["currentPlayer"]]["curse"] == 0){
        G["players"][ctx["currentPlayer"]]["curse"] = 1
      } else {
        G["players"][ctx["currentPlayer"]]["curse"] = 0
      }
    }, 

    retainer: ( {G, ctx, moves}) => {
      if (G["players"][ctx["currentPlayer"]]["retainer"] == 0){
        G["players"][ctx["currentPlayer"]]["retainer"] = 1
      } else {
        G["players"][ctx["currentPlayer"]]["retainer"] = 0
      }
    }, 

    loan: ( {G, ctx, moves}) => {
      if (G["players"][ctx["currentPlayer"]]["loan"] == 0){
        G["players"][ctx["currentPlayer"]]["loan"] = 1
      } else {
        G["players"][ctx["currentPlayer"]]["loan"] = 0
      }
    }, 

    membership: ( {G, ctx, moves}) => {
      if (G["players"][ctx["currentPlayer"]]["membership"] == 0){
        G["players"][ctx["currentPlayer"]]["membership"] = 1
      } else {
        G["players"][ctx["currentPlayer"]]["membership"] = 0
      }
    }, 

    convertir: ( {G, ctx, moves}, n, faces) => {
      G["lastConversion"] = conversor(n, faces)
    },

  },
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
      blessing: 0,
      curse: 0,
      retainer: 0,
      loan: 0,
      membership: 0,
      deputy: [],
      investigator: { name: "No"},
    }
    array.push(player)
  }
  return array
}
