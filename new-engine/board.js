// There's a default visual map for the board:
//  bottom right (0-5), bottom left (6-11), top left (12-17), top right (18-23)
// The default matrix positions and move direction per game are:
// Portes:
//  P0: start on top right, end on bottom right (CCW)
//  P1: start on bottom right, end on top right (CW)
// Plakoto:
//  P0: start on bottom right, end on top right (CW)
//  P1: start on top right, end on bottom right (CCW)
// Fevga:
//  P0: start on top right, end on bottom right (CCW)
//  P1: start on bottom left, end on top left (CCW)
import { START_POSITIONS, TRANSLATION_MATRICES } from './constants/board.js';

// In order to simplify game logic though, everyone is moving from 0 to 23
export const getTranslatedMatrix = (game, turn, board) => (
    Array.from({ length: 24 }, (_, i) => board[TRANSLATION_MATRICES[game][turn][i]])
);

export const getUntranslatedMatrix = (game, turn, board) => (
    Array.from({ length: 24 }, (_, i) => {
        const to = TRANSLATION_MATRICES[game][turn][i];
        return board[to];
    })
);

const getUntranslatedPosition = (game, turn, position) => {
    const { from, to } = position;
    const matrix = TRANSLATION_MATRICES[game][turn];

    return {
        from: matrix.indexOf(from),
        to: matrix.indexOf(to),
        dice: position.dice,
    };
}

export function getInitBoard(game) {
    return globalThis.structuredClone(START_POSITIONS[game]);
}
