const isInHomeBoard = (board, turn) => {
    for (let i = 0; i < 18; i++) {
        if (board[i].includes(turn)) return false;
    }
    return true;
}

const canBearOff = (board, turn, from, diceValue) => {
    if (!isInHomeBoard(board, turn)) return false;

    const spacesNeeded = 24 - from;
    return diceValue >= spacesNeeded;
}

const canLandOn = (pieces, turn) => {
    // In Fevga, you can only land on empty spaces
    return pieces.length === 0;
}

export const getAllowedMovesFevga = ({ turn, board, players, dice }) => {
    const player = players[turn];
    const allowed = [];

    if (player.hit > 0) {
        for (const die of dice.remaining) {
            const to = die - 1;
            if (to < 24 && canLandOn(board[to], turn)) {
                allowed.push({ from: -1, to, dice: die });
            }
        }
        return allowed;
    }

    for (let from = 0; from < 24; from++) {
        const fromPieces = board[from];
        if (!fromPieces.includes(turn)) continue;

        for (const die of dice.remaining) {
            const to = from + die;

            if (to >= 24) {
                if (canBearOff(board, turn, from, die)) {
                    allowed.push({ from, to: 24, dice: die });
                }
                continue;
            }

            if (canLandOn(board[to], turn)) {
                allowed.push({ from, to, dice: die });
            }
        }
    }

    return allowed;
}