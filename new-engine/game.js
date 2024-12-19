import { getInitBoard } from './board.js';

const rollDice = () => {
    const dice = [ Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6) ];
    const remaining = dice[0] === dice[1]
        ? [ dice[0], dice[0], dice[1], dice[1] ]
        : [ dice[0], dice[1] ];

    return { dice, remaining };
};

const getFirstTurn = (dice) => (((dice[0] === dice[1] && dice[0] < 4) || dice[0] > dice[1]) ? 0 : 1);

const getAllowedPositions = (dice, board, turn) => {
    return [];
}

export const getGameActions = (value, state) => {
    if (state.showQuit) {
        return [
            { value: 'action:continue', label: 'Back' },
            { value: 'scene:menu', label: 'Yes, quit' },
        ];
    }

    // if self turn
    // if has no dice: roll, quit
    // if has dice, can play: select, quit
    // if has dice, can play, has selected: move/takeout, quit
    // if has dice, can not play: frame, quit
    // if action == frame && cannot play -> change turn: actions for other player
    // if enemy turn
    // if has no dice: roll, quit
    // if has dice, can play: select, quit
    // if has dice, can play, has selected: move/takeout, quit
    // if action == frame && cannot play -> change turn

    return [
        { value: 'action:roll', label: 'roll' },
        { value: 'action:select', label: 'select', position: 0, team: 0 }, // position can be arbitrary 0 - 23
        { value: 'action:move', label: 'move', position: 0, team: 0 },
        { value: 'action:takeout', label: 'take out', position: 0, team: 0 },
        { value: 'action:frame', label: 'frame', delay: 0 }, // time can be arbitrary number of msecs
        { value: 'action:quit', label: 'quit', label: 'Quit' },
    ];
};

export const getGameInitState = (value) => {
    const parts = value.split(':')
    const isMatch = parts[2] === 'match';
    const game = (isMatch ? 'portes' : parts[2]) ?? 'portes';
    const maxScore = (isMatch ? Number.parseInt(parts[3]) : 1) ?? 1;
    const dice = rollDice();
    const board = getInitBoard(game);
    const turn = getFirstTurn(dice);

    const match = {
        game,
        maxScore,
        scoreA: 0,
        scoreB: 0,
    };

    return {
        turn,
        allowedPositions: getAllowedPositions(board, dice, turn),
        board,
        players: [
            { out: 0, hit: 0, dice: 0, upFrom: 0 },
            { out: 0, hit: 0, dice: 0, upFrom: 0 },
        ],
        dice: {
            played: [],
            unusable: [],
            ...dice,
        },
        match,
    };
}
