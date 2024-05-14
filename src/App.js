import { Client } from 'boardgame.io/react';
import { ArkhamHorror} from './Game';

const App = Client({
  game: ArkhamHorror
});

export default App;
