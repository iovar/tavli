// this function gets a state and produces a list of allowed moves
// The allowed moves correspond to the default layout board, but internally the board used
// is always a translated board that is from 0 to 23 for the current player
// -1 means the piece is hit and is waiting to be placed back on the board
// 24 means the piece is out of the board

import { getAllowedMovesPortes} from './portes.js';

export const getAllowedMoves = ({
    game,
    board,
    ...restProps
}) => {
    // start by translating the board to the current player's perspective

    if (game === 'portes') {
        return getAllowedMovesPortes({ board, ...restProps });
    }

    if (game === 'plakoto') {
        return getAllowedMovesPlakoto({ board, ...restProps });
    }

    if (game === 'fevga') {
        return getAllowedMovesFevga({ board, ...restProps });
    }

    return [];
};

const getAllowedMovesPlakoto = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    return allowed;
}

const getAllowedMovesFevga = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    return allowed;
}

