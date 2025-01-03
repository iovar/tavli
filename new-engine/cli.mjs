import { tavliGame } from './main.js';
import readline from 'node:readline';

const config = {
    options: [
        {
            value: 'player_color',
            label: 'Select your colour',
            values: [
                { value: '#fff', label: 'white' },
                { value: '#000', label: 'black' },
            ],
            selected: undefined,
        },
        {
            value: 'opponent_color',
            label: 'Select oponent\'s colour',
            values: [
                { value: '#000', label: 'black' },
                { value: '#fff', label: 'white' },
            ],
            selected: undefined,
        },
        {
            value: 'board_orientation',
            label: 'Board orientation',
            values: [
                { value: 'top_right', label: 'Top Right' },
                { value: 'top_left', label: 'Top Left' },
                { value: 'bottom_right', label: 'Bottom Right' },
                { value: 'bottom_left', label: 'Bottom Left' },
            ],
            selected: undefined,
        }
    ]
}

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
        console.log('state', { ...state, board: null });
    } else {
        console.log('Options are [CTL-C to exit]:');
    }
}

async function readActionSelection(actions) {
    const value = await new Promise(async (resolve) => (
        rl.question('', resolve)
    ));

    return actions[Number.parseInt(value)];
}

async function main () {
    const game = tavliGame(config);
    let result = game.next();
    console.log('*** Tavli 3d ***');

    while(!result.done) {
        const { actions, scene, state } = result.value;

        printScene(scene, state);
        printActions(actions);

        const action = await readActionSelection(actions);

        if (action) {
            result = game.next(action);
        }
    }
}

await main();
