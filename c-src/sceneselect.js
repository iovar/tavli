import { can_play } from "./can_play.js";
import { retrieval_area_total } from "./retrieval_area_total.js";
import { roll } from "./roll.js";
import { think } from "./think.js";

/* int sceneselect(char *HOME, */
/* GLint positionMatrix[24][6], */
/* GLint *outYou, */
/* GLint *outOp, */
/* GLint *hitYou, */
/* GLint *hitOp, */
/* int   *turn, */
/* int dice[2], */
/* ) */

let quit = 0;
const pouliYUp = { value: 0 };
const moves = [0, 0];
const opmoves = [0, 0];

const getEmptyMatrix = () =>
  Array.from({ length: 24 }, () => Array.from({ length: 6 }));

export function* sceneselect(
  positionMatrix = getEmptyMatrix(),
  outYou = { value: 0 },
  outOp = { value: 0 },
  hitYou = { value: 0 },
  hitOp = { value: 0 },
  turn = { value: 0 },
  dice = [0, 0],
) {
  const button = 0;
  const opdice = [0, 0];
  const game = 0;
  const prevselection = -5;
  const pouliwas = 0;
  const hitwas = 0;
  const match = 0;
  const match_type = 0;
  const match_score = [0, 0];
  const match_limit = 5;
  const prev_match_game = 3;
  while (!quit) {
    if (turn.value === 0 && pouliYUp.value === 0) {
      if (!can_play(1, moves, positionMatrix, dice, hitYou, outYou, game)) {
        turn.value = 1;
      }
    }
    if (turn.value === 0) {
      input_exec(
        acc,
        strafe,
        down_,
        gkpr,
        rotx,
        roty,
        positionMatrix,
        outYou,
        outOp,
        hitYou,
        hitOp,
        turn,
        xmvr,
        zmvr,
        yrot,
        dice,
        moves,
        opmoves,
        pouliYUp,
        res,
        prefs,
        game,
      );
    } else if (
      outYou.value === 15 ||
      (game === 1 && positionMatrix[23][4] === 1 && positionMatrix[23][5] === 1)
    ) {
      quit = 4;
      break;
    }
    if (retrieval_area_total(1, positionMatrix) + outYou.value > 15) {
      for (let lcr = 5; lcr >= 0; lcr--)
        if (positionMatrix[23 - lcr][4] === 1) {
          positionMatrix[23 - lcr][3]--;
          if (positionMatrix[23 - lcr][3] === 0)
            positionMatrix[23 - lcr][4] = 0;
        }
    }
    if (turn.value === 1 && quit !== 4) {
      dice = roll();
      let doubles = 0;
      if (dice[0] === dice[1]) doubles = 1;
      //nulify*************************
      moves[0] = 0;
      moves[1] = 0;
      opmoves[0] = 0; //in case there
      opmoves[1] = 0; //are leftover
      turn.value = 0; //actions
      //nulify*************************
      opdice[0] = dice[0];
      opdice[1] = dice[1];
      /********!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*********/
      think(positionMatrix, dice, hitOp, hitYou, outOp, outYou, game); //<----opponent action
      /************************************************************/
      dice = roll();
      if (
        outOp.value >= 15 ||
        (game === 1 && positionMatrix[0][4] === 2 && positionMatrix[0][5] === 1)
      ) {
        if (match) {
          match_score[1] += outYou.value === 0 ? 2 : 1;
        }
      } else if (
        outYou.value >= 15 ||
        (game === 1 &&
          positionMatrix[23][4] === 1 &&
          positionMatrix[23][5] === 1)
      ) {
        if (match) {
          match_score[0] += outOp.value === 0 ? 2 : 1;
        }
      }
      //nulify*************************
      moves[0] = 0;
      moves[1] = 0;
      opmoves[0] = 0; //in case there
      opmoves[1] = 0; //are leftover
      turn.value = 0; //actions
      //nulify*************************
    }
  }

  return quit;
}

window.sceneselect = sceneselect;
