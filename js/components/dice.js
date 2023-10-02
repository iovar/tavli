// vi: ft=html
function getTemplate() { return `
<style>
.dice-container {
    --highlight-dice: #30C5FF;
    --highlight-dot: #FFC530;

    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.dice {
    position: relative;
    aspect-ratio: 1;
    width: 64px;
    background: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid var(--highlight-dice);
    border-radius: 2px;
    font-size: xx-large;
    margin: 20px;
}

.dice[data-remaining="0"] {
    opacity: 0.25;
    border: 0;
}

.dice[data-remaining="2"]::after {
    content: ' ';
    position: absolute;
    right: 0;
    top: 0;
    width: 15%;
    aspect-ratio: 1;

    background: var(--highlight-dot);
    border-radius: 100%;
}
</style>
<section class="dice-container" data-if="visible">
    <div class="dice" data-attr="data-remaining:remainingA" data-content="diceA"></div>
    <div class="dice" data-attr="data-remaining:remainingB" data-content="diceB"></div>
</section>
`}

// <script>
import config from '../../config.js';

const { BaseComponent } = await import(`${config.BASE_PATH}/base-component.js`);

export class Dice extends BaseComponent {
    static initValues = { diceA: 6, diceB: 6, remainingA: false, remainingB: false, visible: false };

    constructor() {
        super(getTemplate(), { inline: true });
    }

    connectedCallback() {
        this.setStateValues({ ...Dice.initValues });
    }

    set(diceA, diceB) {
        const remaining = diceA === diceB ? 2 : 1;
        this.setStateValues({
            ...this.state.values,
            diceA,
            diceB,
            remainingA: remaining,
            remainingB: remaining,
        });
    }

    use(dice) {
        const { diceA, diceB, remainingA, remainingB } = this.state.values;
        if (diceA === dice && remainingA) {
            this.setStateValues({
                ...this.state.values,
                remainingA: remainingA - 1,
            });
        } else if (diceB === dice && remainingB) {
            this.setStateValues({
                ...this.state.values,
                remainingB: remainingB - 1,
            });
        }
    }

    show() {
        this.setStateValues({ ...this.state.values, visible: true });
    }

    hide() {
        this.setStateValues({ ...this.state.values, visible: false });
    }
}
// </script>
