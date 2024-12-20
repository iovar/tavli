import { getInitBoard } from './board.js';
import { rollDice } from './dice.js';
import { getAllowedMoves } from './get_allowed_moves.js';
;

const getFirstTurn = (dice) => (((dice[0] === dice[1] && dice[0] < 4) || dice[0] > dice[1]) ? 0 : 1);

const checkCanPlay = (state) => (
    state.allowedMoves.length && (dice.remaining.length - dice.unusable.length) > 0
);

export const getGameActions = (value, state) => {
    const player = state.players[state.turn];
    const canPlay = checkCanPlay(state);

    if (state.showQuit) {
        return [
            { value: 'action:continue', label: 'Back' },
            { value: 'scene:menu', label: 'Yes, quit' },
        ];
    }

    if (!canPlay && value !== 'action:frame') {
        return [
            { value: 'action:frame', label: 'frame', delay: 0 },
            { value: 'action:quit', label: 'quit', label: 'Quit' },
        ];
    }

    if ((!canPlay && value === 'action:frame') || !dice.rolled.length) {
        return [
            { value: 'action:roll', label: 'roll' },
            { value: 'action:quit', label: 'quit', label: 'Quit' },
        ];
    }

    if (canPlay && player.hit) {
        return [
            { value: 'action:move', label: 'move' },
            { value: 'action:quit', label: 'quit', label: 'Quit' },
        ];
    }

    if (canPlay && player.upFrom >= 0) {
        const canMove = allowedMoves.some(i => i.to !== 24 && i.to !== -1);
        const canTakeout = allowedMoves.some(i => i.to === 24 || i.to === -1);

        return [
            ...(canMove ? [{ value: 'action:move', label: 'move' }] : []),
            ...(canTakeout ? [{ value: 'action:takeout', label: 'takeout' }] : []),
            { value: 'action:quit', label: 'quit', label: 'Quit' },
        ];
    }

    if (players.out < 15) {
        return [
            { value: 'action:select', label: 'select', position: 0, team: 0 },
            { value: 'action:quit', label: 'quit', label: 'Quit' },
        ];
    }

    return [
        { value: 'action:frame', label: 'frame', position: 0, team: 0 },
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
        allowedMoves: getAllowedMoves(board, dice, turn),
        board,
        players: [
            { out: 0, hit: 0, dice: 0, upFrom: -1 },
            { out: 0, hit: 0, dice: 0, upFrom: -1 },
        ],
        dice,
        match,
    };
}
