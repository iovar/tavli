import { ActionSeparator, ActionPrefix } from './constants/actions.js';
import { SCENES, SceneNames } from './constants/scene.js';
import { getGameActions, getGameInitState } from './game.js';
import { stateReducer } from './state/reducer.js';

export const getNextScene = (value) => {
    const parts = value.split(ActionSeparator);

    if (parts[0] === ActionPrefix.scene && parts[1]) {
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

    if (key && key !== SceneNames.game) {
        return handleMenuScene(action, currentScene);
    }

    if (key === SceneNames.game) {
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

const handleGameScene = (action, currentScene) => {
    const key = getNextScene(action.value);

    if (key && key !== SceneNames.game) {
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
        case SceneNames.menu:
        case SceneNames.options:
        case SceneNames.credits:
            return handleMenuScene(action, currentScene);
        case SceneNames.startGame:
        case SceneNames.startMatch:
            return handleGameSelectScene(action, currentScene);
        case SceneNames.game:
            return handleGameScene(action, currentScene);
        default:
            return currentScene;
    }
};
