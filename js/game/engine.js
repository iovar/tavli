
const START_POSITIONS = {
    plakoto: [
        [0, 0], [], [], [], [], [1, 1, 1, 1, 1],

        [], [1, 1, 1], [], [], [], [0, 0, 0, 0, 0],

        [1, 1, 1, 1, 1], [], [], [], [0, 0, 0], [],

        [0, 0, 0, 0, 0], [], [], [], [], [1, 1],
    ],
    portes:  [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [], [], [], [], [],

        [], [], [], [], [], [],

        [], [], [], [], [], [],

        [], [], [], [], [], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    fevga: [
        [], [], [], [], [], [],

        [], [], [], [], [], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

        [], [], [], [], [], [],

        [], [], [], [], [], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
};

function initMatrix(game) {
    return JSON.parse(JSON.stringify(START_POSITIONS[game]));
}

const WAIT_INPUT = 'wait_input';
const ROLL = 'roll';
const END = 'end';
const PC_MOVE = 'pc_move';
const BOARD_UPDATE = 'board_update';

export function* gameEngine(game) {
    let matrix = initMatrix(game);

    yield { matrix, event: BOARD_UPDATE, dice: [1, 3] }

    // if first die roll has a > b, player starts, if not b starts
    // if a === b, random > 0.5 => a, otherwise, b
    /* { event: 'roll', matrix, dice },
     * start animation, show result, move cursor: pc_move, awaiting_input
     *
     * { event: 'end', matrix , dice},
     * start animation, show result, show menu, end saga
     *
     * { event: 'pc_move', matrix , dice},
     * wait for a sec, move cursor: awaiting_input, end, roll, pc_move
     *
     * { event: 'awaiting_input', matrix, dice },
     * move cursor: awaiting_input, end, roll, pc_move
     *
     * { event: 'board_update', matrix, dice }
     * wait for a sec, move cursor: awaiting_input, end, roll, pc_move
     */
}
