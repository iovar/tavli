// vi: ft=html
function getTemplate() { return `
<style>
.menu-container {
    position: fixed;
    z-index: 3;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

button {
    padding: 16px;
    border-radius: 8px;
    font-size: large;
    margin: 20px;
}
</style>>

<section class="menu-container" data-if="not:playing">
    <h2>Tavli, by Ioannis Varouchakis</h2>
    <menu>
        <button data-game="plakoto" data-callback="click:startGame">Play Plakoto</button>
        <button data-game="portes" data-callback="click:startGame">Play Portes</button>
        <button data-game="fevga" data-callback="click:startGame">Play Fevga</button>
    </menu>
</section>
`}

// <script>
import config from '../../config.js';
import {
    WAIT_INPUT,
    ROLL,
    END,
    PC_MOVE,
    BOARD_UPDATE,
    gameEngine
} from '../game/engine.js';

const UPDATE_TIMEOUT = 3000;
const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Menu extends BaseComponent {
    board = null;
    allowInput = false;

    constructor() {
        super(getTemplate(), { inline: true });
    }

    connectedCallback() {
        this.setStateValues({ ...this.state.values, engine: null });
    }

    startGame(event) {
        const game = event.target.dataset.game;
        const engine = gameEngine(game);
        let { value } = engine.next();

        this.initializeDice(value.dice);
        this.initializeBoard(value.matrix);
        this.setStateValues({ ...this.state.values, engine, playing: true });

        this.runLoop();
    }

    runLoop(selected, newPosition) {
        console.log(selected, newPosition);
        if (!this.state.values.engine) {
            return;
        }

        let { value } = this.state.values.engine.next({ selected, newPosition });

        this.board.allowInput = false;

        if (value?.event === END) {
            this.setStateValues({ ...this.state.values,  engine: null, playing: false });
        } else if ([ROLL, PC_MOVE, BOARD_UPDATE].includes(value?.event)) {
            setTimeout(() => {
                this.runLoop();
            }, UPDATE_TIMEOUT);
        } else if (value?.event === WAIT_INPUT) {
            this.board.allowInput = true;
        }
    }

    initializeDice(values) {
        this.dice = document.querySelector(`[data-id="${this.dataset.diceId}"]`);
        this.dice.set(...values);
        this.dice.show();
    }

    initializeBoard(matrix) {
        this.board = document.querySelector(`[data-id="${this.dataset.boardId}"]`);
        this.board.updateBoard(matrix);
        this.board.setMoveCallback((selected, newPosition) => this.board.allowInput && this.runLoop(selected, newPosition));
    }
}
// </script>
