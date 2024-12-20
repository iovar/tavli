import { SCENES, handleScene } from './scene.js';

export function* tavliGame(config) {
    let running = true;
    let currentScene = globalThis.structuredClone(SCENES.menu);

    while (running) {
        const action = yield currentScene;
        currentScene = handleScene(action, currentScene);
    }
}
