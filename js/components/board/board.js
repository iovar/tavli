import config from '../../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Board extends BaseComponent {
    static url = import.meta.url;
    allowInput = false;
    lastInputMatrix = [];
    selected = -1;
    moveCallback = () => {};

    constructor() {
        super(Board.url);
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
            const isSelectedColumn = index === this.selected;

            const allItems = inputMatrix[index] ? inputMatrix[index].map((team) => (
                { props: JSON.stringify({ team, selected: isSelectedColumn.toString(), index }) }
            )) : [];

            matrix[index] = {
                piecesA: allItems.slice(0, 5),
                piecesB: allItems.slice(5, 10),
                piecesC: allItems.slice(10, 15),
                piecesD: allItems.slice(15, 20),
                index: `${index}`,
            };
        });
        this.setStateValues(this.matrixToAreas(matrix));
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
