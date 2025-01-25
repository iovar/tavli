const isInHomeBoard = (board, turn) => {
    for (let i = 0; i < 18; i++) {
        if (board[i].includes(turn)) return false;
    }
    return true;
}

const canBearOff = (board, turn, from, diceValue) => {
    if (!isInHomeBoard(board, turn)) return false;

    const spacesNeeded = 24 - from;
    if (diceValue === spacesNeeded) return true;

    if (diceValue > spacesNeeded) {
        for (let i = from + 1; i < 24; i++) {
            if (board[i].includes(turn)) return false;
        }
        return true;
    }
    return false;
}

const canLandOn = (pieces, turn) => {
    if (pieces.length === 0) return true;
    if (pieces[0] === turn) return true;
    return pieces.length === 1;
}

const canPin = (pieces, turn) => {
    return pieces[0] !== turn && pieces.length === 1;
}

const getAllowedMovesPortes = ({ turn, board, players, dice }) => {
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

            if (canLandOn(board[to], turn) || canPin(board[to], turn)) {
                allowed.push({ from, to, dice: die });
            }
        }
    }

    return allowed;
}

const getUpdatedBoardPortes = (move, board, turn) => {
    const { from, to } = move;
    const updatedBoard = structuredClone(board);
    hit = board[to].length === 1 && board[to][0] !== turn;

    if (from !== -1) {
        updatedBoard[from].pop();
    }
    if (to !== 24 && !hit) {
        updatedBoard[to].push(turn);
    } else if (hit) {
        updatedBoard[to] = [turn];
    }
    return { updatedBoard, hit };
}

export {
    getAllowedMovesPortes,
    getUpdatedBoardPortes,
};