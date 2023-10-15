// vi: ft=html
function getPosTemplate(pos) { return `
    <div class="triangle-container">
        <div class="triangle"></div>
        <div class="stack-a">
            ${pos.piecesA.map((team) => (`<piece-x data-team="${team}"></piece-x>`)).join('')}
        </div>
        <div class="stack-b">
            ${pos.piecesB.map((team) => (`<piece-x data-team="${team}"></piece-x>`)).join('')}
        </div>
        <div class="stack-c">
            ${pos.piecesC.map((team) => (`<piece-x data-team="${team}"></piece-x>`)).join('')}
        </div>
        <div class="stack-d">
            ${pos.piecesD.map((team) => (`<piece-x data-team="${team}"></piece-x>`)).join('')}
        </div>
        <div class="overlay" data-position="${pos.index}"></div>
    </div>
`}

function getTemplate({ matrix }) { return `
<style>
.root {
    --board-brown-0: #80471C;
    --board-brown-1: #7E481C;
    --board-brown-2: #7F461B;
    --board-brown-3: #7C4700;

    --place-dark: #2B1700;

    --play-area: #997950;
    --highlight-col: #30C5FF;

    aspect-ratio: 1.154;
    position: relative;
    background-color: var(--board-brown-0);
}

.board-background {
    position: absolute;
    width: 100%;
    height: 100%;
}

.half-board {
    width: 40%;
    top: 7.7%;
    height: 84.6%;
    position: absolute;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 5fr 1fr 5fr;

    background-color: var(--play-area);
    box-shadow: inset 0px 0px 4px var(--place-dark);
}

.quarter-board {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
}

.right-area {
    right: 5%;
}

.left-area {
    left: 5%;
}

.triangle {
    --clip-value: polygon(0% 0%, 50% 100%, 100% 0%);
    --clip-value-rev: polygon(0% 100%, 50% 0%, 100% 100%);

    height: 44.4%;
    width: 16.67%;
    width: 100%;
    height: 100%;
    background-color: var(--board-brown-2);
    box-shadow: inset 0px 0px 4px var(--place-dark);

    --webkit-clip-path: var(--clip-value);
    clip-path: var(--clip-value);
}

.triangle-container {
    position: relative;
}

.triangle-container:nth-child(even) .triangle {
    background-color: var(--place-dark);
}

.inverse .triangle-container {
    transform: rotate3d(0, 0, 1, 180deg);
}

.inverse .triangle {
    background-color: var(--place-dark);
}

.inverse .triangle-container:nth-child(even) .triangle {
    background-color: var(--board-brown-2);
}

[class^=stack] {
    position: absolute;
    top: 12px;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 4px;
    justify-items: center;

    perspective: 500px;
    transform-style: preserve-3d;
}

.stack-b {
    top: 8px;
}

.stack-c {
    top: 4px;
}

.stack-d {
    top: 0;
}

.piece-container {
    width: calc(100% - 4px);
    height: calc(100% - 2px)
}

.overlay {
    position: absolute;
    z-index: 2;
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100% + 20px)
}

.overlay:hover {
    border-radius: 2%;
    box-shadow: 0 0 4px var(--highlight-col), inset 0 0 2px var(--highlight-col);
}
</style>
<div class="root">
    <div class="board-background">
        <div class="left-area half-board">
            <div class="quarter-board" onclick="this.getRootNode().host.clickTriangle(event)">
                ${matrix.leftTop.map((pos) => getPosTemplate(pos)).join('')}
            </div>

            <div></div>

            <div class="quarter-board inverse" onclick="this.getRootNode().host.clickTriangle(event)">
                ${matrix.leftBottom.map(getPosTemplate).join('')}
            </div>
        </div>
        <div class="right-area half-board">
            <div class="quarter-board" onclick="this.getRootNode().host.clickTriangle(event)">
                ${matrix.rightTop.map(getPosTemplate).join('')}
            </div>

            <div></div>

            <div class="quarter-board inverse" onclick="this.getRootNode().host.clickTriangle(event)">
                ${matrix.rightBottom.map(getPosTemplate).join('')}
            </div>
        </div>
    </div>
</div>
`}

// <script>
export class Board extends HTMLElement {
    static url = import.meta.url;
    allowInput = false;
    lastInputMatrix = [];
    selected = -1;
    moveCallback = () => {};

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.matrix = this.matrixToAreas([]);
    }

    set allowInput(value) {
        if (value !== this.allowInput && value === false || value === true) {
            this.allowInput = value;
        }
    }

    setMoveCallback(fn) {
        this.moveCallback = fn;
    }

    connectedCallback() {
        this.updateBoard();
    }

    updateBoard(inputMatrix = []) {
        this.lastInputMatrix = inputMatrix;
        const matrix = [];

        Array.from({ length: 24 }, (_, index) => {
            const items = inputMatrix[index] ?? [];

            matrix[index] = {
                piecesA: items.slice(0, 5),
                piecesB: items.slice(5, 10),
                piecesC: items.slice(10, 15),
                piecesD: items.slice(15, 20),
                index: `${index}`,
                selected: index === this.selected,
            };
        });
        this.matrix = this.matrixToAreas(matrix);
        console.log(this.matrix);
        this.shadowRoot.innerHTML = getTemplate({ matrix: this.matrix });
    }

    matrixToAreas(matrix) {
        return {
            matrix,
            leftTop: matrix.slice(6, 12).reverse(),
            leftBottom: matrix.slice(12, 18),
            rightTop: matrix.slice(0, 6).reverse(),
            rightBottom: matrix.slice(18, 24),
        }
    }

    clickTriangle(event) {
        if (!this.allowInput) {
            return;
        }
        const newPosition = parseInt(event.target.dataset.position);
        if (this.selected >= 0) {
            this.moveCallback(this.selected, newPosition);
            this.selected = -1;
        } else {
            this.selected = newPosition;
        }
        this.updateBoard(this.lastInputMatrix);
    }
}
// </script>
