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

        [], [], [], [], [], [],

        [], [], [], [], [], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
};

// old position matrix structure:
// Array[24][6] ->
//  Columns 0, 1, 2, are just for rendering to reflect the orientation and chosen side. They are now unused
//  Column 3 is number of pieces of owner of the block
//  Column 4 is the owner of the block (1 or 2 or nothing)
//  Column 5 is if there is a blocked piece from the non-owning team here (so total is col[3] + col[4])

// Action must run twice. Once with pouliYUp = 0, once with pouliYUp = 1;
// TODO
// covertMatrixToLegacy(matrix) => legacy
// getMatrixFromLegacy(legacy) => matrix

export function initMatrix(game) {
    return JSON.parse(JSON.stringify(START_POSITIONS[game]));
}
