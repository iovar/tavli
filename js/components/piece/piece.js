import config from '../../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Piece extends BaseComponent {
    static url = import.meta.url;

    constructor() {
        super(Piece.url);
    }
}
