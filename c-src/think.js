
/* void think(GLint positionMatrix[24][6], */
/* int dice[2], */
/* GLint *hitOp, */
/* GLint *hitYou, */
/* GLint *outOp, */
/* GLint *outYou, */
/* int game */
/* ) */

export function think(
  positionMatrix,
  dice,
  hitOp,
  hitYou,
  outOp,
  outYou,
  game,
) {
  const dummyMatrix = Array.from({ length: 24 }, () => Array.from({ length: 6 }));

  const mmoves = [0, 0];
  let doubles = 0;
  let i = 0;

  if (dice[0] == dice[1]) {
    doubles = 1;
  }
  for (i = 0; i < doubles + 1; i++) {
    if (game == 0 || game == 1) {
      copy_matrix(positionMatrix, dummyMatrix);
    } else if (game == 2) {
      fevga_matrix(positionMatrix, dummyMatrix);
    }

    if (!can_play(2, mmoves, dummyMatrix, dice, hitOp, outOp, game)) {
      break;
    }
    const root = {};
    list_scenarios(
      dummyMatrix,
      dice,
      mmoves,
      hitOp,
      hitYou,
      outOp,
      outYou,
      root,
      game,
    );
    let best = {};
    best = rate_scenarios(root, game);
    if (game == 2) {
      fevga_matrix(best.positionMatrix, positionMatrix);
    } else {
      copy_matrix(best.positionMatrix, positionMatrix);
    }
    hitOp.value = best.specs.hitOp.value;
    hitYou.value = best.specs.hitYou.value;
    props.outOp = best.specs.outOp;
    props.outYou = best.specs.outYou;
    mmoves[0] = best.specs.moves[0];
    mmoves[1] = best.specs.moves[1];
  }
}
