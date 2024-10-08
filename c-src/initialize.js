const positionMatrix_SW = [
  [6, 1, -1, 2, 1, 0],
  [5, 1, -1, 0, 0, 0],
  [4, 1, -1, 0, 0, 0],
  [3, 1, -1, 0, 0, 0],
  [2, 1, -1, 0, 0, 0],
  [1, 1, -1, 5, 2, 0],
  [1, 1, 1, 0, 0, 0],
  [2, 1, 1, 3, 2, 0],
  [3, 1, 1, 0, 0, 0],
  [4, 1, 1, 0, 0, 0],
  [5, 1, 1, 0, 0, 0],
  [6, 1, 1, 5, 1, 0],
  [6, -1, 1, 5, 2, 0],
  [5, -1, 1, 0, 0, 0],
  [4, -1, 1, 0, 0, 0],
  [3, -1, 1, 0, 0, 0],
  [2, -1, 1, 3, 1, 0],
  [1, -1, 1, 0, 0, 0],
  [1, -1, -1, 5, 1, 0],
  [2, -1, -1, 0, 0, 0],
  [3, -1, -1, 0, 0, 0],
  [4, -1, -1, 0, 0, 0],
  [5, -1, -1, 0, 0, 0],
  [6, -1, -1, 2, 2, 0],
];

const position_SW = [
  23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11,
];

const positionMatrix_SE = [
  [6, 1, 1, 2, 1, 0],
  [5, 1, 1, 0, 0, 0],
  [4, 1, 1, 0, 0, 0],
  [3, 1, 1, 0, 0, 0],
  [2, 1, 1, 0, 0, 0],
  [1, 1, 1, 5, 2, 0],
  [1, 1, -1, 0, 0, 0],
  [2, 1, -1, 3, 2, 0],
  [3, 1, -1, 0, 0, 0],
  [4, 1, -1, 0, 0, 0],
  [5, 1, -1, 0, 0, 0],
  [6, 1, -1, 5, 1, 0],
  [6, -1, -1, 5, 2, 0],
  [5, -1, -1, 0, 0, 0],
  [4, -1, -1, 0, 0, 0],
  [3, -1, -1, 0, 0, 0],
  [2, -1, -1, 3, 1, 0],
  [1, -1, -1, 0, 0, 0],
  [1, -1, 1, 5, 1, 0],
  [2, -1, 1, 0, 0, 0],
  [3, -1, 1, 0, 0, 0],
  [4, -1, 1, 0, 0, 0],
  [5, -1, 1, 0, 0, 0],
  [6, -1, 1, 2, 2, 0],
];

const position_SE = [
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 11, 10, 9, 8, 7, 6, 5, 4, 3,
  2, 1, 0,
];

const positionMatrix_NE = [
  [6, -1, 1, 2, 1, 0],
  [5, -1, 1, 0, 0, 0],
  [4, -1, 1, 0, 0, 0],
  [3, -1, 1, 0, 0, 0],
  [2, -1, 1, 0, 0, 0],
  [1, -1, 1, 5, 2, 0],
  [1, -1, -1, 0, 0, 0],
  [2, -1, -1, 3, 2, 0],
  [3, -1, -1, 0, 0, 0],
  [4, -1, -1, 0, 0, 0],
  [5, -1, -1, 0, 0, 0],
  [6, -1, -1, 5, 1, 0],
  [6, 1, -1, 5, 2, 0],
  [5, 1, -1, 0, 0, 0],
  [4, 1, -1, 0, 0, 0],
  [3, 1, -1, 0, 0, 0],
  [2, 1, -1, 3, 1, 0],
  [1, 1, -1, 0, 0, 0],
  [1, 1, 1, 5, 1, 0],
  [2, 1, 1, 0, 0, 0],
  [3, 1, 1, 0, 0, 0],
  [4, 1, 1, 0, 0, 0],
  [5, 1, 1, 0, 0, 0],
  [6, 1, 1, 2, 2, 0],
];

const position_NE = [
  11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

const positionMatrix_NW = [
  [6, -1, -1, 2, 1, 0],
  [5, -1, -1, 0, 0, 0],
  [4, -1, -1, 0, 0, 0],
  [3, -1, -1, 0, 0, 0],
  [2, -1, -1, 0, 0, 0],
  [1, -1, -1, 5, 2, 0],
  [1, -1, 1, 0, 0, 0],
  [2, -1, 1, 3, 2, 0],
  [3, -1, 1, 0, 0, 0],
  [4, -1, 1, 0, 0, 0],
  [5, -1, 1, 0, 0, 0],
  [6, -1, 1, 5, 1, 0],
  [6, 1, 1, 5, 2, 0],
  [5, 1, 1, 0, 0, 0],
  [4, 1, 1, 0, 0, 0],
  [3, 1, 1, 0, 0, 0],
  [2, 1, 1, 3, 1, 0],
  [1, 1, 1, 0, 0, 0],
  [1, 1, -1, 5, 1, 0],
  [2, 1, -1, 0, 0, 0],
  [3, 1, -1, 0, 0, 0],
  [4, 1, -1, 0, 0, 0],
  [5, 1, -1, 0, 0, 0],
  [6, 1, -1, 2, 2, 0],
];

const position_NW = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
  13, 12,
];

// void initialize(GLint positionMatrix[24][6],
// GLint *outYou,
// GLint *outOp,
// GLint *hitYou,
// GLint *hitOp,
// int   *turn,
// GLfloat *xmvr,
// GLfloat *zmvr,
// GLfloat *yrot,
// Prefs *prefs ,
// int game)
export function initialize(
  positionMatrix,
  outYou,
  outOp,
  hitYou,
  hitOp,
  turn,
  prefs,
  game,
) {
  let i = 0;
  if (outOp.value === 15) {
    turn = { value: 1 };
  } else {
    turn = { value: 0 };
  }

  outYou = { value: 0 };
  outOp = { value: 0 };
  hitYou = { value: 0 };
  hitOp = { value: 0 };

  let upto = 6;
  if (game !== 0) {
    upto = 3;
  }

  let k = 0;
  for (i = 0; i < 24; i++) {
    if (prefs.playerside[game] === 0) {
      prefs.position[i] = position_SW[i];
    } else if (prefs.playerside[game] === 1) {
      prefs.position[i] = position_SE[i];
    } else if (prefs.playerside[game] === 2) {
      prefs.position[i] = position_NE[i];
    } else if (prefs.playerside[game] === 3) {
      prefs.position[i] = position_NW[i];
    }
    for (k = 0; k < upto; k++) {
      if (prefs.playerside[game] === 0) {
        positionMatrix[i][k] = positionMatrix_SW[i][k];
      } else if (prefs.playerside[game] === 1) {
        positionMatrix[i][k] = positionMatrix_SE[i][k];
      } else if (prefs.playerside[game] === 2) {
        positionMatrix[i][k] = positionMatrix_NE[i][k];
      } else if (prefs.playerside[game] === 3) {
        positionMatrix[i][k] = positionMatrix_NW[i][k];
      }
    }
    if (upto !== 6) {
      positionMatrix[i][3] = 0;
      positionMatrix[i][4] = 0;
      positionMatrix[i][5] = 0;
    }
  }

  if (game === 1) {
    positionMatrix[0][3] = 15;
    positionMatrix[0][4] = 1;
    positionMatrix[23][3] = 15;
    positionMatrix[23][4] = 2;
  } else if (game === 2) {
    positionMatrix[0][3] = 15;
    positionMatrix[0][4] = 1;
    positionMatrix[12][3] = 15;
    positionMatrix[12][4] = 2;
  }
}
