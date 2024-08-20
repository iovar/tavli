/* void move_scenario(GLint positionMatrix[24][6], */
/* int mdice[2], */
/* int mmoves[2], */
/* GLint *mhitOp, */
/* GLint *mhitYou, */
/* GLint *moutOp, */
/* GLint *moutYou, */
/* Scenario *root, */
/* int stage, */
/* int game */
/* ) */
const getEmptyMatrix = () =>
  Array.from({ length: 24 }, () => Array.from({ length: 6 }));

export function move_scenario(props) {
  const {
    positionMatrix,
    dice: mdice,
    moves: mmoves,
    hitOp: mhitOp,
    hitYou: mhitYou,
    outOp: moutOp,
    outYou: moutYou,
    root,
    stage,
    game,
  } = props;
  let Last;
  if (stage == 0) Last = null;
  else Last = root;

  let i = 0;

  if (mhitOp.value > 0 && game == 0) {
    for (i = 23; i > 17; i--) {
      let dice = [mdice[0], mdice[1]];
      let moves = [mmoves[0], mmoves[1]];
      let hitOp = { ...mhitOp };
      let hitYou = { ...mhitYou };
      let outOp = { ...moutOp };
      let outYou = { ...moutYou };

      let dummyMatrix = Array.from({ length: 24 }, () =>
        Array.from({ length: 6 }),
      );
      if (
        suppose_takein(
          positionMatrix,
          dummyMatrix,
          i,
          moves,
          dice,
          hitYou,
          hitOp,
          game,
        )
      ) {
        if (!Last) {
          let k;
          let j;
          for (k = 0; k < 24; k++)
            for (j = 0; j < 6; j++)
              root.positionMatrix[k][j] = dummyMatrix[k][j];
          root.specs = {};
          root.specs.hitOp = { ...hitOp };
          root.specs.outOp = { ...outOp };
          root.specs.hitYou = { ...hitYou };
          root.specs.outYou = { ...outYou };
          root.specs.moves = [moves[0], moves[1]];
          root.specs.rating = 0.0;
          root.down = null;
          root.next = null;
          if (!stage) {
            root.next = null;
            Last = root;
          } else {
            root.down = null;
            Last = root;
          }
        } else {
          let temp = { positionMatrix: getEmptyMatrix() };
          let k;
          let j;
          for (k = 0; k < 24; k++)
            for (j = 0; j < 6; j++)
              temp.positionMatrix[k][j] = dummyMatrix[k][j];
          temp.specs = {};
          temp.specs.hitOp = { ...hitOp };
          temp.specs.outOp = { ...outOp };
          temp.specs.hitYou = { ...hitYou };
          temp.specs.outYou = { ...outYou };
          temp.specs.moves = [moves[0], moves[1]];
          temp.specs.rating = 0.0;
          temp.down = null;
          temp.next = null;
          if (!stage) {
            temp.next = null;
            Last.next = temp;
            Last = temp;
          } else {
            temp.down = null;
            Last.down = temp;
            Last = temp;
          }
        }
      }
    }
  } else {
    for (i = 0; i < 6; i++) {
      if (positionMatrix[i][4] == 1 || positionMatrix[i][4] == 0) continue;
      let dice = [mdice[0], mdice[1]];
      let moves = [mmoves[0], mmoves[1]];
      let hitOp = { ...mhitOp };
      let hitYou = { ...mhitYou };
      let outOp = { ...moutOp };
      let outYou = { ...moutYou };

      let dummyMatrix = Array.from({ length: 24 }, () =>
        Array.from({ length: 6 }),
      );
      if (
        suppose_takeout(
          positionMatrix,
          dummyMatrix,
          i,
          moves,
          dice,
          outOp,
          hitOp,
          game,
        )
      ) {
        if (!Last) {
          let k;
          let j;
          for (k = 0; k < 24; k++)
            for (j = 0; j < 6; j++)
              root.positionMatrix[k][j] = dummyMatrix[k][j];
          root.specs = {};
          root.specs.hitOp = { ...hitOp };
          root.specs.outOp = { ...outOp };
          root.specs.hitYou = { ...hitYou };
          root.specs.outYou = { ...outYou };
          root.specs.moves = [moves[0], moves[1]];
          root.specs.rating = 0.0;
          root.down = null;
          root.next = null;
          if (!stage) {
            root.next = null;
            Last = root;
          } else {
            root.down = null;
            Last = root;
          }
        } else {
          let temp = {};
          let k;
          let j;
          for (k = 0; k < 24; k++)
            for (j = 0; j < 6; j++)
              temp.positionMatrix[k][j] = dummyMatrix[k][j];
          temp.specs = {};
          temp.specs.hitOp = { ...hitOp };
          temp.specs.outOp = { ...outOp };
          temp.specs.hitYou = { ...hitYou };
          temp.specs.outYou = { ...outYou };
          root.specs.moves = [moves[0], moves[1]];
          temp.specs.rating = 0.0;
          temp.down = null;
          temp.next = null;
          if (!stage) {
            temp.next = null;
            Last.next = temp;
            Last = temp;
          } else {
            temp.down = null;
            Last.down = temp;
            Last = temp;
          }
        }
      }
    }

    for (i = 1; i < 24; i++) {
      if (positionMatrix[i][4] == 1 || positionMatrix[i][4] == 0) continue;

      for (let d = 0; d < 2; d++) {
        if (i - mdice[d] >= 0) {
          let dice = [mdice[0], mdice[1]];
          let moves = [mmoves[0], mmoves[1]];
          let hitOp = { ...mhitOp };
          let hitYou = { ...mhitYou };
          let outOp = { ...moutOp };
          let outYou = { ...moutYou };

          let dummyMatrix = Array.from({ length: 24 }, () =>
            Array.from({ length: 6 }),
          );
          if (
            suppose_move(
              positionMatrix,
              dummyMatrix,
              i,
              i - dice[d],
              moves,
              dice,
              mhitYou,
              hitOp,
              game,
            )
          ) {
            if (!Last) {
              // 						root=(Scenario *)malloc((sizeof(struct scenario)));
              let k;
              let j;
              for (k = 0; k < 24; k++)
                for (j = 0; j < 6; j++)
                  root.positionMatrix[k][j] = dummyMatrix[k][j];
              root.specs = {};
              root.specs.hitOp = { ...hitOp };
              root.specs.outOp = { ...outOp };
              root.specs.hitYou = { ...hitYou };
              root.specs.outYou = { ...outYou };
              root.specs.moves = [moves[0], moves[1]];
              root.specs.rating = 0.0;
              root.down = null;
              root.next = null;
              if (!stage) {
                root.next = null;
                Last = root;
              } else {
                root.down = null;
                Last = root;
              }
            } else {
              let temp = { positionMatrix: getEmptyMatrix() };
              let k;
              let j;
              for (k = 0; k < 24; k++)
                for (j = 0; j < 6; j++)
                  temp.positionMatrix[k][j] = dummyMatrix[k][j];
              temp.specs = {};
              temp.specs.hitOp = { ...hitOp };
              temp.specs.outOp = { ...outOp };
              temp.specs.hitYou = { ...hitYou };
              temp.specs.outYou = { ...outYou };
              temp.specs.moves = [moves[0], moves[1]];
              temp.specs.rating = 0.0;
              temp.down = null;
              temp.next = null;
              if (!stage) {
                temp.next = null;
                Last.next = temp;
                Last = temp;
              } else {
                temp.down = null;
                Last.down = temp;
                Last = temp;
              }
            }
          }
        }
      }
    }
  }

  return;
}
