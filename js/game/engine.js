import { initMatrix } from './matrix.js';

export const WAIT_INPUT = 'wait_input';
export const ROLL = 'roll';
export const END = 'end';
export const PC_MOVE = 'pc_move';
export const BOARD_UPDATE = 'board_update';

function rollDice() {
    return [
        Math.floor(Math.random() * 5 + 1),
        Math.floor(Math.random() * 5 + 1),
    ];
}

export function* getEvent(startingPlayer) {
    let currentPlayer = startingPlayer;
    let nextPlayer = startingPlayer;
    let event = BOARD_UPDATE;
    let playerSwitch = false;

    while (!currentPlayer && event !== END) {
        nextPlayer = yield event;
        if (nextPlayer !== currentPlayer) {
            playerSwitch = true;
            currentPlayer = nextPlayer;
        }

        switch (event) {
            case WAIT_INPUT:
                event = BOARD_UPDATE;
                break;
            case ROLL:
                event = (currentPlayer === 0 ? WAIT_INPUT : PC_MOVE);
                break;
            case PC_MOVE:
                event = BOARD_UPDATE;
                break;
            case BOARD_UPDATE:
                if (playerSwitch) {
                    event = ROLL;
                    playerSwitch = false;
                } else if (currentPlayer === 1) {
                    event = WAIT_INPUT;
                } else if (currentPlayer === 2) {
                    event = PC_MOVE;
                } else {
                    event = END;
                }
                break;
            case END:
            default:
                yield END;
        }
    }

    yield event;
}

function getStartingPlayer (dice) {
    if (dice[0] > dice[1]) {
        return 1;
    } else if (dice[1] > dice[0]) {
        return 2;
    } else {
        return Math.random() > 0.5 ? 1 : 2;
    }
}

export function* gameEngine(game) {
    let matrix = initMatrix(game);
    let hit = [0, 0];
    let out = [0, 0];
    let dice = rollDice();
    let moves = [0, 0];

    let player = getStartingPlayer(dice);
    const eventGenerator = getEvent(player);
    let event = eventGenerator.next(player);

    console.log(event, player);
    while (event.value !== END) {
        // input is either timed, or a move from to
        let input = yield { matrix, dice, event: event.value, moves, hit, out };

        if (event.value === WAIT_INPUT) {
            // try input, update matrix, update useDice, check if must switch
            // get { player, matrix, usedDice, hit } of engine

        } else if (event.value === PC_MOVE) {
            // get move from engine, update matrix, update usedDice, check if must switch
            // get { player, matrix, usedDice, hit } of engine
        }

        event = eventGenerator.next(player);
    }

    yield { matrix, dice, event: event.value, moves, hit, out };
}
