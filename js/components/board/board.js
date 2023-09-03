import config from '../../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Board extends BaseComponent {
    static url = import.meta.url;

    constructor() {
        super(Board.url);
    }

    connectedCallback() {
        this.initData();
    }

    initData() {
        const matrix = [];
        for (let i = 0; i < 24; i++) {
            const allItems = Array.from({ length: i }, (_, k) => (
                { props: JSON.stringify({ team: `${k%2}` , selected: i === 3 }) }
            ));
            matrix[i] = {
                piecesA: allItems.slice(0, 5),
                piecesB: allItems.slice(5, 10),
                piecesC: allItems.slice(10, 15),
                piecesD: allItems.slice(15, 20),
                index: `${i}`,
            };
        }
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
        console.log('clicked', event.currentTarget, event.target);
        // const slot = this.shadowRoot.querySelector('slot[name=link]')
        // const link = slot.assignedNodes()[0];
        // link.click();
    }
}
