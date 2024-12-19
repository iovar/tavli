import { getGameActions, getGameInitState } from './game.js';

export const SCENES = {
    menu: {
        scene: 'menu',
        actions: [
            { value: 'scene:start_game', label: 'Start Game' },
            { value: 'scene:start_match', label: 'Play a Match' },
            { value: 'scene:options', label: 'Options' },
            { value: 'scene:credits', label: 'Credits' },
        ],
    },
    options: {
        scene: 'options',
        actions: [
            // get options from UI config
            { value: 'scene:menu', label: 'Back' },
        ],
    },
    credits: {
        scene: 'credits',
        actions: [ { value: 'scene:menu', label: 'Back' } ],
        state: {
            author: 'Ioannis Varouchakis',
            license: 'GNU AFFERO GENERAL PUBLIC LICENSE v3',
            copyright: '2024, 2025',
            contact: '',
            text: '',
        },
    },
    start_game: {
        scene: 'start_game',
        actions: [
            { value: 'scene:game:portes', label: 'Portes' },
            { value: 'scene:game:plakoto', label: 'Plakoto' },
            { value: 'scene:game:fevga', label: 'Fevga' },
            { value: 'scene:menu', label: 'Back' },
        ],
    },
    start_match: {
        scene: 'start_match',
        actions: [
            { value: 'scene:game:match:3', label: '3 Points' },
            { value: 'scene:game:match:5', label: '5 Points' },
            { value: 'scene:game:match:7', label: '7 Points' },
            { value: 'scene:game:match:9', label: '9 Points' },
            { value: 'scene:menu', label: 'Back' },
        ],
    },
    game: {
        scene: 'game',
        // for the game, actions should be generated on every turn
        actions: [
            { value: 'action:roll' },
            { value: 'action:select', position: 0, team: 0 }, // position can be arbitrary 0 - 23
            { value: 'action:move', position: 0, team: 0 },
            { value: 'action:takeout', position: 0, team: 0 },
            { value: 'action:frame', delay: 0 }, // time can be arbitrary number of msecs
            { value: 'action:quit', label: 'Quit' },
            { value: 'scene:menu', label: 'Yes, quit' },
        ],
        state: {
            turn: 0,
            showQuit: false,
            allowedPositions: [], // 0 - 24, 24 being out. act different if hit, up, or taking out
            // 0 - 23, array with team number
            board: Array.from({ length: 23 }, () => ([])),
            players: [
                { out: 0, hit: 0, dice: 0, upFrom: 0 /*0 - 23*/ },
                { out: 0, hit: 0, dice: 0, upFrom: 0 /*0 - 23*/ },
            ],
            dice: {
                rolled: [2, 3],
                played: [],
                remaining: [2, 3], // can be more in case of doubles
                unusable: [],
            },
            match: {
                game: '', // portes, plakoto, fevga
                scoreA: 0,
                scoreB: 0,
                maxScore: 3, // 3, 5, 7, 9
            },
        }
    }
};

export const getNextScene = (value) => {
    const parts = value.split(':')

    if (parts[0] === 'scene' && parts[1]) {
        return parts[1];
    }
};

const handleMenuScene = (action, currentScene) => {
    const key = getNextScene(action.value);
    const nextScene = SCENES[key] && globalThis.structuredClone(SCENES[key]);

    return nextScene ?? currentScene;
}

const handleGameSelectScene = (action, currentScene) => {
    const key = getNextScene(action.value);

    if (key && key !== 'game') {
        return handleMenuScene(action, currentScene);
    }

    if (key === 'game') {
        const nextScene = globalThis.structuredClone(SCENES.game);
        const initState = getGameInitState(action.value);
        const state = {
            ...nextScene.state,
            ...initState,
        };
        const actions = getGameActions(action.value, state);
        // TODO get actions, too

        return {
            ...nextScene,
            actions,
            state: {
                // TODO must setup board, possible actions, dice, etc?
                ...nextScene.state,
                ...initState,
            },
        };
    }

    return currentScene;
}

const checkShowQuit = (action, currentScene) => ({
    ...currentScene,
    showQuit: action.value === 'action:quit'
        || (currentScene.state.showQuit && action.value !== 'action:continue')
});

const ifAction = (value, fn) => (action, currentScene) => (
    value === action.value ? fn(action, currentScene) : currentScene
);
const checkSelect = ifAction('action:select', (action, currentScene) => ({
    ...currentScene,
}));

const checkRoll = ifAction('action:roll', (action, currentScene) => ({
    ...currentScene,
}));

// updates allowedPositions, available dice, change turn (frame && cannot play)
const checkMove = ifAction('action:move', (action, currentScene) => ({
    ...currentScene,
}));

const checkTakeOut = ifAction('action:takeout', (action, currentScene) => ({
    ...currentScene,
}));

const checkFrame = ifAction('action:frame', (action, currentScene) => ({
    ...currentScene,
}));

const sceneReducer = (action, currentScene) => ([
        checkShowQuit,
        checkSelect,
        checkRoll,
        checkMove,
        checkTakeOut,
        checkFrame,
    ].reduce((scene, fn) => ({
        ...scene,
        ...fn(action, scene),
    }), currentScene)
);

const handleGameScene = (action, currentScene) => {
    const key = getNextScene(action.value);

    if (key && key !== 'game') {
        return handleMenuScene(action, currentScene);
    }

    const nextState = sceneReducer(action, currentScene);
    const actions = getGameActions(action.value, nextState);

    return {
        ...currentScene,
        actions,
        state: nextState,
    };
};

export const handleScene = (action, currentScene) => {
    switch(currentScene.scene) {
        case 'menu':
        case 'options':
        case 'credits':
            return handleMenuScene(action, currentScene);
        case 'start_game':
        case 'start_match':
            return handleGameSelectScene(action, currentScene);
        case 'game':
            return handleGameScene(action, currentScene);
        default:
            return currentScene;
    }
};
