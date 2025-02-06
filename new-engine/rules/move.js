import { Games } from '../constants/game.js';
import { getAllowedMovesPortes } from './portes.js';
import { getAllowedMovesPlakoto } from './plakoto.js';
import { getAllowedMovesFevga } from './fevga.js';
import { getTranslatedMatrix, getUntranslatedPosition } from '../items/board.js';

export const getAllowedMoves = ({
    game,
    board,
    turn,
    ...restProps
}) => {
    const translatedBoard = getTranslatedMatrix(game, turn, board);
    const gameProps = { board: translatedBoard, turn, ...restProps };
    let moves = [];

    if (game === Games.portes) {
        moves = getAllowedMovesPortes(gameProps);
    }

    if (game === Games.plakoto) {
        moves = getAllowedMovesPlakoto(gameProps);
    }

    if (game === Games.fevga) {
        moves = getAllowedMovesFevga(gameProps);
    }

    return moves.map(move => getUntranslatedPosition(game, turn, move));
};

