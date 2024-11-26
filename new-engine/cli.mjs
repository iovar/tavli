import { tavliGame } from './index.js';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const main = async () => {
    const game = tavliGame({});
    let result = game.next();
    console.log('*** Tavli 3d ***');

    while(!result.done) {
        const { actions, scene, state } = result.value;

        if (scene === 'game') {
            // TODO print board, dice, score, etc
            console.log('state', state);

        } else {
            console.log('Options are:');
        }

        actions.forEach(({ label }, index) => console.log(index, ') ', label));

        const value = await new Promise((resolve) => (
            rl.question('', resolve)
        ));

        const action = actions[Number.parseInt(value)];

        if (action) {
            result = game.next(action);
        }
    }
}

await main();
