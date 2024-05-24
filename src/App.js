import { Client } from 'boardgame.io/react';
import { ArkhamHorror } from './Game';
// import { Local } from 'boardgame.io/multiplayer';

import { Inventory } from './Board';

const App = Client({
  game: ArkhamHorror,
  numPlayers: 2,
  board: Inventory,
//  multiplayer: Local({
//    persist: true,
//    storageKey: 'bgio',
//  })

});

export default App;
