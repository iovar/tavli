// vi: ft=html
function getTemplate({ playing }) { return `
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

${ playing ? '' : `
<section class="menu-container">
    <h2>Tavli, by Ioannis Varouchakis</h2>
    <menu>
        <button onclick="this.getRootNode().host.startGame('plakoto')">Play Plakoto</button>
        <button onclick="this.getRootNode().host.startGame('portes')">Play Portes</button>
        <button onclick="this.getRootNode().host.startGame('fevga')">Play Fevga</button>
    </menu>
</section>`}
`}

// <script>
import {
    WAIT_INPUT,
    ROLL,
    END,
    PC_MOVE,
    BOARD_UPDATE,
    gameEngine
} from '../game/engine.js';

const UPDATE_TIMEOUT = 3000;

export class Menu extends HTMLElement {
    board = null;
    allowInput = false;
    engine = null;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = getTemplate(false);
    }

    startGame(game) {
        const engine = gameEngine(game);
        let { value } = engine.next();

        this.initializeDice(value.dice);
        this.initializeBoard(value.matrix);
        this.engine = engine;
        this.shadowRoot.innerHTML = getTemplate({ playing: true });

        this.runLoop();
    }

    runLoop(selected, newPosition) {
        console.log(selected, newPosition);
        if (!this.engine) {
            return;
        }

        let { value } = this.engine.next({ selected, newPosition });

        this.board.allowInput = false;

        if (value?.event === END) {
            this.engine = null;
            this.shadowRoot.innerHTML = getTemplate({ playing: false });
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
