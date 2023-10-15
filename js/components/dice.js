// vi: ft=html
function getTemplate({ diceA, diceB, remainingA, remainingB, visible }) { return `
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

.dice.used {
    opacity: 0.25;
    border: 0;
}

.dice.double::after {
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
${ visible ? `<section class="dice-container">
    <div class="dice ${remainingA === 2 ? 'double' : ''} ${remainingA === 0 ? 'used' : ''}">${diceA}</div>
    <div class="dice ${remainingB === 2 ? 'double' : ''} ${remainingB === 0 ? 'used' : ''}">${diceB}</div>
</section>` : '' }
`}

// <script>
export class Dice extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.values = { visible: false }
    }

    set(diceA, diceB) {
        const remaining = diceA === diceB ? 2 : 1;
        this.values = {
            ...this.values,
            diceA,
            diceB,
            remainingA: remaining,
            remainingB: remaining,
        };
        this.shadowRoot.innerHTML = getTemplate(this.values);
    }

    use(dice) {
        const { diceA, diceB, remainingA, remainingB } = this.state.values;
        if (diceA === dice && remainingA) {
            this.values = {
                ...this.values,
                remainingA: remainingA - 1,
            };
        } else if (diceB === dice && remainingB) {
            this.values = {
                ...this.values,
                remainingB: remainingB - 1,
            };
        }
        this.shadowRoot.innerHTML = getTemplate(this.values);
    }

    show() {
        this.values = { ...this.values, visible: true };
        this.shadowRoot.innerHTML = getTemplate(this.values);
    }

    hide() {
        this.values = { ...this.values, visible: false };
        this.shadowRoot.innerHTML = getTemplate(this.values);
    }
}
// </script>
