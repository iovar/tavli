import config from '../../../config.js';
import { gameEngine } from '../../game/engine.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Menu extends BaseComponent {
    static url = import.meta.url;
    board = null;

    constructor() {
        super(Menu.url);
    }

    connectedCallback() {
        this.setStateValues({ playing: false });
    }

    startGame(event) {
        const game = event.target.dataset.game;
        const engine = gameEngine(game);
        let state = engine.next();

        console.log('got', state);
        this.initializeDice(state.value.dice);
        this.initializeBoard(state.value.matrix);

        this.setStateValues({ playing: true });
    }

    initializeDice(values) {
        this.dice = document.querySelector(`[data-id="${this.dataset.diceId}"]`);
        this.dice.roll(...values);
        this.dice.show();
    }

    initializeBoard(matrix) {
        this.board = document.querySelector(`[data-id="${this.dataset.boardId}"]`);
        this.board.updateBoard(matrix);
    }
}
