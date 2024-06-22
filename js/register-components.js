import { Board } from './components/board.js';
import { Piece } from './components/piece.js';
import { Menu } from './components/menu.js';
import { Dice } from './components/dice.js';

customElements.define('board-component', Board);
customElements.define('piece-component', Piece);
customElements.define('menu-component', Menu);
customElements.define('dice-component', Dice);
