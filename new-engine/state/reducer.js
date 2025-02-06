import { Actions, ActionSeparator, ActionPrefix } from '../constants/actions.js';
import { rollDice, updateDice } from '../items/dice.js';
import { getAllowedMoves } from '../rules/move.js';
import { getUpdatedBoardPortes } from '../rules/portes.js';

const ifAction = (value, fn) => (action, currentState) => (
    value === action.value ? fn(action, currentState) : currentState
);

const checkShowQuit = (action, currentState) => ({
    ...currentState,
    showQuit: action.value === Actions.quit
        || (currentState.showQuit && action.value !== Actions.continue)
});

const checkSelect = ifAction(Actions.select, (action, currentState) => {
    const { turn, allowedMoves, players } = currentState;
    const player = players[turn];
    const allowed = allowedMoves.find(({ from }) => from === action.position);

    if (!allowed) {
        return currentState;
    }

    const newPlayers = [...players];
    newPlayers[turn] = { ...player, upFrom: action.position };

    return {
        ...currentState,
        players: newPlayers,
    };
});

const checkRoll = ifAction(Actions.roll, (action, currentState) => {
    const dice = rollDice();
    const { game, turn, board, players } = currentState;
    const allowedMoves = getAllowedMoves({ game, turn, board, players, dice });
    // find unusable moves after recursing through all possible moves

    return {
        ...currentState,
        dice,
        allowedMoves,
    }
});

const checkMove = ifAction(Actions.move, (action, currentState) => {
    const { turn, allowedMoves, players, dice } = currentState;
    const otherPlayer = turn === 0 ? 1 : 0;
    const player = players[turn];
    const move = { from: player.upFrom, to: action.position };
    const allowed = allowedMoves.find(({ from, to }) => from === player.upFrom && to === action.position);
    const newDice = updateDice(move, dice);

    const newPlayers = [...players];
    newPlayers[turn] = { ...player, upFrom: -1 };

    if (!allowed) {
        return {
            ...currentState,
            players: newPlayers,
        };
    }

    const { updatedBoard, hit } = getUpdatedBoardPortes(move, currentState.board, turn);
    if (move.from === -1) {
        newPlayers[turn].hit -= 1;
    }
    if (hit) {
        newPlayers[otherPlayer].hit += 1;
    }

    const newAllowedMoves = getAllowedMoves({
        game,
        turn,
        board: updatedBoard,
        players: newPlayers,
        dice: newDice,
     });

    return {
        ...currentState,
        dice: newDice,
        players: newPlayers,
        board: updatedBoard,
        allowedMoves: newAllowedMoves,
    };
});

// TODO
// same as above
// also checks endgame condition
const checkTakeOut = ifAction(Actions.takeout, (action, currentState) => ({
    ...currentState,
}));

const checkFrame = ifAction(Actions.frame, (_, currentState) => currentState);

export const stateReducer = (action, currentState) => ([
        checkShowQuit,
        checkSelect,
        checkRoll,
        checkMove,
        checkTakeOut,
        checkFrame,
    ].reduce((state, fn) => fn(action, state), currentState)
);
