import { getRemoteTemplate } from './lib/remote-template.js';
import { Board } from './components/board/board.js';
import { Piece } from './components/piece/piece.js';
import { Menu } from './components/menu.js';
import { Dice } from './components/dice.js';

await getRemoteTemplate(Board.url);
await getRemoteTemplate(Piece.url);

customElements.define('board-x', Board);
customElements.define('piece-x', Piece);
customElements.define('menu-x', Menu);
customElements.define('dice-x', Dice);
