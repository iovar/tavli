import { SCENES } from './constants/scene.js';
import { rollDice, updateDice } from './dice.js';
import { getGameActions, getGameInitState } from './game.js';

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

        return {
            ...nextScene,
            actions,
            state: {
                ...nextScene.state,
                ...initState,
            },
        };
    }

    return currentScene;
}

const checkShowQuit = (action, currentState) => ({
    ...currentState,
    showQuit: action.value === 'action:quit'
        || (currentState.showQuit && action.value !== 'action:continue')
});

const ifAction = (value, fn) => (action, currentState) => (
    value === action.value ? fn(action, currentState) : currentState
);

const checkSelect = ifAction('action:select', (action, currentState) => {
    const { turn, allowedMoves, players } = currentState;
    const player = players[turn];
    const allowed = allowedMoves.find(({ from }) => from === action.position);

    if (!allowed) {
        return currentState;
    }

    const newPlayers = [...players];
    newPlayers[turn] = { ...player, upFrom: action.position };

    return {
        ...currentState,
        players: newPlayers,
    };
});

const checkRoll = ifAction('action:roll', (action, currentState) => ({
    ...currentState,
    dice: rollDice(),
}));

// TODO
const checkMove = ifAction('action:move', (action, currentState) => {
    const { turn, allowedMoves, players, dice } = currentState;
    const player = players[turn];
    const allowed = allowedMoves.find(({ from, to }) => from === player.upFrom && to === action.position);
    const newDice = updateDice(move, dice, game, turn);

    const newPlayers = [...players];

    if (!allowed) {
        newPlayers[turn] = { ...player, upFrom: -1 };

        return {
            ...currentState,
            players: newPlayers,
        };
    }

    // then update board, upate enemy hit, dice,

    return {
        ...currentState,
    };
});

// TODO
// same as above
// also checks endgame condition
const checkTakeOut = ifAction('action:takeout', (action, currentState) => ({
    ...currentState,
}));

const checkFrame = ifAction('action:frame', (_, currentState) => currentState);

const stateReducer = (action, currentState) => ([
        checkShowQuit,
        checkSelect,
        checkRoll,
        checkMove,
        checkTakeOut,
        checkFrame,
    ].reduce((state, fn) => fn(action, state), currentState)
);

const handleGameScene = (action, currentScene) => {
    const key = getNextScene(action.value);

    if (key && key !== 'game') {
        return handleMenuScene(action, currentScene);
    }

    const state = stateReducer(action, currentScene.state);
    const actions = getGameActions(action.value, state);

    return {
        ...currentScene,
        actions,
        state,
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
