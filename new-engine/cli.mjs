import { tavliGame } from './index.js';
import readline from 'node:readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function main() {
    const game = tavliGame({});

    console.log('*** Tavli 3d ***');

    while(true) {
        let result = game.next();

        console.log(`In scene ${result.value.scene}`);
        console.log('Options are:');

        result.value.actions.forEach(({ label }, index) => console.log(index, ') ', label));
        rl.question('Type a number', number => {
            console.log('got', number);
        });

    }
}

main();
