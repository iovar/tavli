// There's a default visual map for the board:
//  bottom right (0-5), bottom left (6-11), top left (12-17), top right (18-23)
// The default matrix positions and move direction per game are:
// Plakoto:
//  P0: start on top right, end on bottom right (CCW)
//  P1: start on bottom right, end on top right (CW)
// Portes:
//  P0: start on bottom right, end on top right (CW)
//  P1: start on top right, end on bottom right (CCW)
// Fevga:
//  P0: start on top right, end on bottom right (CCW)
//  P1: start on bottom left, end on top left (CCW)
import {
    PLAKOTO_TRANSLATION_MATRIX,
    PORTES_TRANSLATION_MATRIX,
    START_POSITIONS,
} from './constants/board.js';

const getOwnPlakotoMatrix = (turn, board) => (
    Array.from({ length: 24 }, (_, i) => {
        const to = PLAKOTO_TRANSLATION_MATRIX[i][turn];
        return board[to];
    })
);

const getOwnPortesMatrix = (turn, board) => (
    Array.from({ length: 24 }, (_, i) => {
        const to = PORTES_TRANSLATION_MATRIX[i][turn];
        return board[to];
    })
);

console.log(getOwnPortesMatrix(0, START_POSITIONS.portes));
console.log(getOwnPortesMatrix(1, START_POSITIONS.portes));

const getOwnFevgaMatrix = (turn, board) => {
    if (turn === 0) {
        return board.toReversed();
    }

    return [
        ...board.slice(0, 12).toReversed(),
        ...board.slice(12, 24).toReversed(),
    ];
}

// In order to simplify game logic though, everyone is moving from 0 to 23
const getOwnMatrix = (game, turn, board) => {
    // TODO make translation matrix arrays object with game as key
    // turn this whole function to just a single call of Array.from
    if (game === 'plakoto') {
        return translatePlakotoMatrix(turn, board);
    }
    if (game === 'portes') {
        return translatePortesMatrix(turn, board);
    }
    if (game === 'fevga') {
        return translateFevgaMatrix(turn, board);
    }
    return board;
}

// TODO write translation to default matrix functions
// similar to above, just a lookup for index with value, instead of indexed access
const getDefaultPosition = (game, turn, position) => {
    // positon: { from: 0, to: 4, dice: 5 }
    if (game === 'plakoto') {
        return translatePlakotoPosition(turn, position);
    }
    if (game === 'portes') {
        return translatePortesPosition(turn, position);
    }
    if (game === 'fevga') {
        return translateFevgaPosition(turn, position);
    }
    return position;
}

export function getInitBoard(game) {
    return globalThis.structuredClone(START_POSITIONS[game]);
}
