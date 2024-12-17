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

const getGameActions = (value, currentScene) => {
    if (currentScene.state.showQuit) {
        return [
            { value: 'action:continue', label: 'Back' },
            { value: 'scene:menu', label: 'Yes, quit' },
        ];
    }
    return [
        { value: 'action:roll' },
        { value: 'action:select', position: 0, team: 0 }, // position can be arbitrary 0 - 23
        { value: 'action:move', position: 0, team: 0 },
        { value: 'action:takeout', position: 0, team: 0 },
        { value: 'action:frame', delay: 0 }, // time can be arbitrary number of msecs
        { value: 'action:quit', label: 'Quit' },
    ];
};

export const getGameInitState = (value) => {
    const parts = value.split(':')
    const isMatch = parts[2] === 'match';
    const game = (isMatch ? 'portes' : parts[2]) ?? 'portes';
    const maxScore = (isMatch ? Number.parseInt(parts[3]) : 1) ?? 1;
    const dice = rollDice();
    const board = getInitBoard();
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
