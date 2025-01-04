// this function gets a state and produces a list of allowed moves
// The allowed moves correspond to the default layout board, but internally the board used
// is always a translated board that is from 0 to 23 for the current player
// -1 means the piece is hit and is waiting to be placed back on the board
// 24 means the piece is out of the board
export const getAllowedMoves = ({
    game,
    board,
    ...restProps
}) => {
    // start by translating the board to the current player's perspective

    if (game === 'plakoto') {
        return getAllowedMovesPlakoto(restProps);
    }

    if (game === 'portes') {
        return getAllowedMovesPortes(restProps);
    }

    if (game === 'fevga') {
        return getAllowedMovesFevga(restProps);
    }


    // this function gets a state and produces a list of allowed moves
    // turn is 0 or 1, and the board array has 24 elements which are arrays of 0, or 1, marking the team number (the turn) of the player on that position

    // if the player has hit pieces, they must move them
    // if the player has no hit pieces, they can move any piece
    // no more comment suggestions

    // map positions back to the original board
    return [];
}

const getAllowedMovesPlakoto = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    return allowed;
}

const getAllowedMovesPortes = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    return allowed;
}

const getAllowedMovesFevga = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    return allowed;
}

