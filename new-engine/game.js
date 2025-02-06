import { ActionSeparator, Actions } from './constants/actions.js';
import { GameTypes } from './constants/game.js';
import {
    getRollAction,
    getSelectAction,
    getMoveAction,
    getTakeoutAction,
    getFrameAction,
    getContinueAction,
    getQuitAction,
} from './state/actions.js';
import { getInitBoard } from './items/board.js';
import { rollDice } from './items/dice.js';
import { getAllowedMoves } from './rules/move.js';
;

const getFirstTurn = (dice) => (((dice[0] === dice[1] && dice[0] < 4) || dice[0] > dice[1]) ? 0 : 1);

const checkCanPlay = (state) => (
    state.allowedMoves.length && (state.dice.remaining.length - state.dice.unusable.length) > 0
);

export const getGameActions = (value, state) => {
    const player = state.players[state.turn];
    const canPlay = checkCanPlay(state);
    const allowedMoves = state.allowedMoves;

    if (state.showQuit) {
        return [
            getContinueAction(),
            { value: 'scene:menu', label: 'Yes, quit' },
        ];
    }

    if (!canPlay && value !== Actions.frame) {
        return [
            getFrameAction(0),
            getQuitAction(),
        ];
    }

    if ((!canPlay && value === Actions.frame) || !state.dice.rolled.length) {
        return [
            getRollAction(),
            getQuitAction(),
        ];
    }

    if (canPlay && player.hit) {
        return [
            getMoveAction(0),
            getQuitAction(),
        ];
    }

    if (canPlay && player.upFrom >= 0) {
        const canMove = allowedMoves.some(i => i.to !== 24 && i.to !== -1);
        const canTakeout = allowedMoves.some(i => i.to === 24 || i.to === -1);

        return [
            ...(canMove ? [getMoveAction(0)] : []),
            ...(canTakeout ? [getTakeoutAction()] : []),
            getQuitAction(),
        ];
    }

    if (player.out < 15) {
        return [
            getSelectAction(0),
            getQuitAction(),
        ];
    }

    return [
        getFrameAction(),
        getQuitAction(),
    ];
};

export const getGameInitState = (value) => {
    const parts = value.split(ActionSeparator)
    const isMatch = parts[2] === GameTypes.match;
    const game = (isMatch ? Games.portes : parts[2]) ?? Games.portes;
    const maxScore = (isMatch ? Number.parseInt(parts[3]) : 1) ?? 1;
    const dice = rollDice();
    const board = getInitBoard(game);
    const turn = getFirstTurn(dice);
    const players = [
        { out: 0, hit: 0, dice: 0, upFrom: -1 },
        { out: 0, hit: 0, dice: 0, upFrom: -1 },
    ];

    const match = {
        game,
        maxScore,
        scoreA: 0,
        scoreB: 0,
    };

    return {
        turn,
        allowedMoves: getAllowedMoves({ game, turn, board, players, dice }),
        board,
        players,
        dice,
        match,
    };
}
