const HTML = /*html*/`
<div class="piece select-container" data-team="">
    <div class="layer-a"></div>
    <div class="layer-b"></div>
    <div class="layer-c"></div>
</div>
`;

const CSS = /*css*/`
    :host {
        display: block;
        width: 100%;
    }

    .piece {
        --piece-white: #FEFCFF;
        --piece-white-shadow: #AEACAF;
        --piece-black: #090906;
        --piece-black-shadow: #393936;
        --select-highlight: #FFFFFF;

        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 100%;

        box-shadow: 0 0 2px rgba(0, 0, 0, 0.6);

        &[data-team=""] {
            display: none;
        }

        &[data-selected="true"] {
            box-shadow: 0 0 12px var(--select-highlight),
                        0 0 12px var(--select-highlight);
        }

        [class^=layer-] {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 100%;
        }

        .layer-c {
            top: 50%;
            left: 50%;
            width: 30%;
            height: 30%;
            margin: -15% 0 0 -15%;
        }
    }


    .piece[data-team="0"] {
        .layer-a {
            top: 2px;
            background-color: var(--piece-white-shadow);
        }
        .layer-b {
            background-color: var(--piece-white);
        }
        .layer-c {
            background: radial-gradient(var(--piece-white), var(--piece-white-shadow));
        }
    }

    .piece[data-team="1"] {
        .layer-a {
            top: 2px;
            background-color: var(--piece-black-shadow);
        }

        .layer-b {
            background-color: var(--piece-black);
        }

        .layer-c {
            background: radial-gradient(var(--piece-black), var(--piece-black-shadow));
        }
    }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(CSS);

export class Piece extends HTMLElement {
    static observedProps = [ 'data-team', 'data-selected' ];

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const { team } = this.dataset;
        this.shadowRoot.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];
        this.shadowRoot.innerHTML = HTML;
        this.shadowRoot.children[0].dataset.team = team;
    }
}

customElements.define('piece-component', Piece);
