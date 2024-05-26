import { Client } from 'boardgame.io/react';
import { ArkhamHorror } from './Game';
import { Local } from 'boardgame.io/multiplayer';

import { SocketIO } from 'boardgame.io/multiplayer'

import { Inventory } from './Board';

const App = Client({
  game: ArkhamHorror,
  numPlayers: 2,
  board: Inventory,
  multiplayer: Local()
});

//const App = Client({
//  game: ArkhamHorror,
//  numPlayers: 2,
//  board: Inventory,
//  multiplayer: SocketIO({ server: '192.168.1.3:8000' }),
//});

export default App;
