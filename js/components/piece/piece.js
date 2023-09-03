import config from '../../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Piece extends BaseComponent {
    static get observedAttributes() { return [ 'data-team' ]; }

    constructor() {
        super(import.meta.url);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.setStateValues({ team: newValue });
    };
}
