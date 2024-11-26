import { tavliGame } from './index.js';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function printActions(actions) {
    actions.forEach(
        ({ label }, index) => console.log(index, ') ', label)
    );
}

function printScene(scene, state) {
    if (scene === 'game') {
        // TODO print board, dice, score, etc
        console.log('state', state);
    } else {
        console.log('Options are:');
    }
}

async function readActionSelection(actions) {
    const value = new Promise((resolve) => (
        rl.question('', resolve)
    ));

    return actions[Number.parseInt(value)];
}

async function main () {
    const game = tavliGame({});
    let result = game.next();
    console.log('*** Tavli 3d ***');

    while(!result.done) {
        const { actions, scene, state } = result.value;

        printScene(scene, state);
        printActions(actions);

        const value = await readActionSelection(actions);

        if (action) {
            result = game.next(action);
        }
    }
}

await main();
