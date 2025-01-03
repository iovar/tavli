export const getAllowedMoves = ({
    game,
    ...restProps
}) => {
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

    return [];
}

const getAllowedMovesPlakoto = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    if (player.hit) {
        for (let d = 0; d < 2; d++) {
            if (dice[d] < 1 + doubles) {
                if (
                    board[-1 + dice[d]][4] === 0 ||
                    board[-1 + dice[d]][4] === 1 ||
                    (board[-1 + dice[d]][4] === 2 &&
                        board[-1 + dice[d]][3] < 2)
                ) {
                    allowed.push({ from: -1 + dice[d], to: 4 });
                }
            }
        }
    }

    return allowed;
}

const getAllowedMovesPortes = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    if (player.hit) {
        for (let d = 0; d < 2; d++) {
            if (dice[d] < 1 + doubles) {
                if (
                    board[24 - dice[d]][4] === 0 ||
                    board[24 - dice[d]][4] === 2 ||
                    (board[24 - dice[d]][4] === 1 &&
                        board[24 - dice[d]][3] < 2)
                ) {
                    allowed.push({ from: 24 - dice[d], to: 4 });
                }
            }
        }
    }

    return allowed;
}

const getAllowedMovesFevga = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    if (player.hit) {
        for (let d = 0; d < 2; d++) {
            if (dice[d] < 1 + doubles) {
                if (
                    board[23 * (turn - 1)][3] === 14 &&
                    board[23 * (turn - 1)][4] === turn
                ) {
                    for (let fevgcount = 12 * (2 - turn); fevgcount <= 11 + 12 * (2 - turn); fevgcount++) {
                        if (board[fevgcount][4] === turn) {
                            allowed.push({ from: fevgcount, to: fevgcount + dice[d] });
                        }
                    }
                }
            }
        }
    }

    return allowed;
}

