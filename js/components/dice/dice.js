import config from '../../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Dice extends BaseComponent {
    static url = import.meta.url;

    constructor() {
        super(Dice.url);
    }

    connectedCallback() {
        this.setStateValues({ diceA: 6, diceB: 6, visible: false });
    }

    roll(diceA, diceB) {
        const { visible } = this.state.values;
        this.setStateValues({ diceA, diceB, visible });
    }

    show() {
        const { diceA, diceB } = this.state.values;
        this.setStateValues({ diceA, diceB, visible: true });
    }

    hide() {
        const { diceA, diceB } = this.state.values;
        this.setStateValues({ diceA, diceB, visible: false });
    }
}
