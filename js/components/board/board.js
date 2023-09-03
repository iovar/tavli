import config from '../../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Board extends BaseComponent {
    matrix = [];

    constructor() {
        super(import.meta.url);
    }

    connectedCallback() {
        this.initData();
    }

    initData() {
        for (let i = 0; i < 24; i++) {
            const allItems = Array.from({ length: i }, (_, k) => ({ team: `${k%2}` }));
            this.matrix[i] = {
                piecesA: allItems.slice(0, 5),
                piecesB: allItems.slice(5, 10),
                piecesC: allItems.slice(10, 15),
                piecesD: allItems.slice(15, 20),
                index: `${i}`,
            };
        }
        this.setStateValues(this.matrixAsState());
    }

    matrixAsState() {
        return {
            leftTop: this.matrix.slice(6, 12).reverse(),
            leftBottom: this.matrix.slice(12, 18),
            rightTop: this.matrix.slice(0, 6).reverse(),
            rightBottom: this.matrix.slice(18, 24),
        }
    }

    clickTriangle() {
        console.log('clicked');
        // const slot = this.shadowRoot.querySelector('slot[name=link]')
        // const link = slot.assignedNodes()[0];
        // link.click();
    }
}
