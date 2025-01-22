import { getAllowedMovesPortes } from './rules/portes.js';
import { getAllowedMovesPlakoto } from './rules/plakoto.js';
import { getAllowedMovesFevga } from './rules/fevga.js';
import { getTranslatedMatrix, getUntranslatedPosition } from './board.js';

export const getAllowedMoves = ({
    game,
    board,
    turn,
    ...restProps
}) => {
    const translatedBoard = getTranslatedMatrix(game, turn, board);
    const gameProps = { board: translatedBoard, turn, ...restProps };
    let moves = [];

    if (game === 'portes') {
        moves = getAllowedMovesPortes(gameProps);
    }

    if (game === 'plakoto') {
        moves = getAllowedMovesPlakoto(gameProps);
    }

    if (game === 'fevga') {
        moves = getAllowedMovesFevga(gameProps);
    }

    return moves.map(move => getUntranslatedPosition(game, turn, move));
};

