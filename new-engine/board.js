// For plakoto and portes mental model is a board that starts from:
// the bottom right, to bottom left, to top left, to top right.
//  player 0 starts at bottom right, ends at top right (0 -> 23)
//  player 1 starts at top right, ends at bottom right (23 -> 0)
// For fevga mental model is a board that starts from:
// the bottom right, to bottom left, to top right, to top left.
//  player 0 starts top right, ends at bottom right (12 -> 23 -> 11 -> 0)
//  player 1 starts at bottom left, ends at top left (11 -> 0 -> 12 -> 23)
//  x < 0 && !turn: x = ABS(x) + 11
//  x > 23 && turn: x = 11 - (x - 23) = 34 - x
const START_POSITIONS = {
    plakoto: [
        [0, 0], [], [], [], [], [1, 1, 1, 1, 1],

        [], [1, 1, 1], [], [], [], [0, 0, 0, 0, 0],

        [1, 1, 1, 1, 1], [], [], [], [0, 0, 0], [],

        [0, 0, 0, 0, 0], [], [], [], [], [1, 1],
    ],
    portes:  [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [], [], [], [], [],

        [], [], [], [], [], [],

        [], [], [], [], [], [],

        [], [], [], [], [], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    fevga: [
        [], [], [], [], [], [],

        [], [], [], [], [], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],

        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [], [], [], [], [],

        [], [], [], [], [], [],
    ],
};

export function getInitBoard(game) {
    return globalThis.structuredClone(START_POSITIONS[game]);
}
