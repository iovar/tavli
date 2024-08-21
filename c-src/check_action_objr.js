/* int check_action(int Last_,int New_,int team_, */
/* GLint positionMatrix[24][6], */
/* int dice[2], */
/* int moves[2], */
/* int opmoves[2], */
/* int   *turn */
/* ,int game */
/* ) */
// TODO return only turn and status
export function check_action(
  Last_,
  New_,
  team_,
  positionMatrix,
  dice,
  moves,
  opmoves,
  turn,
  game,
) {
  let k = 1;
  let doubles = 0;
  if (dice[0] === dice[1]) {
    doubles = 1;
  }

  if (team_ === 1) {
    if (
      positionMatrix[New_][4] === 2 &&
      (positionMatrix[New_][3] + positionMatrix[New_][5] > 1 || game === 2)
    ) {
      return {
        status: 1,
        Last_,
        New_,
        team_,
        positionMatrix,
        dice,
        moves,
        opmoves,
        turn,
        game,
      };
    }

    if (
      Last_ + dice[0] === New_ &&
      ((doubles === 1 && moves[0] < 2) || (doubles === 0 && moves[0] < 1))
    ) {
      moves[0]++;
      k = 0;
    } else if (
      Last_ + dice[1] === New_ &&
      ((doubles === 1 && moves[1] < 2) || (doubles === 0 && moves[1] < 1))
    ) {
      moves[1]++;
      k = 0;
    } else if (
      Last_ + dice[1] + dice[0] === New_ &&
      ((doubles === 1 && moves[1] < 2 && moves[0] < 2) ||
        (doubles === 0 && moves[1] < 1 && moves[0] < 1))
    ) {
      if (
        positionMatrix[Last_ + dice[1]][4] === 2 &&
        (positionMatrix[Last_ + dice[1]][3] +
          positionMatrix[Last_ + dice[1]][5] >
          1 ||
          game === 2) &&
        positionMatrix[Last_ + dice[0]][4] === 2 &&
        (positionMatrix[Last_ + dice[0]][3] +
          positionMatrix[Last_ + dice[0]][5] >
          1 ||
          game === 2)
      ) {
        k = 1;
      } else {
        moves[0]++;
        moves[1]++;
        k = 0;
      }
    } else if (
      Last_ + 2 * dice[0] === New_ &&
      doubles === 1 &&
      moves[0] === 0
    ) {
      if (
        positionMatrix[Last_ + dice[0]][4] === 2 &&
        (positionMatrix[Last_ + dice[0]][3] +
          positionMatrix[Last_ + dice[0]][5] >
          1 ||
          game === 2)
      ) {
        k = 1;
      } else {
        moves[0] += 2;
        k = 0;
      }
    } else if (
      Last_ + 2 * dice[1] === New_ &&
      doubles === 1 &&
      moves[1] === 0
    ) {
      if (
        positionMatrix[Last_ + dice[1]][4] === 2 &&
        (positionMatrix[Last_ + dice[1]][3] +
          positionMatrix[Last_ + dice[1]][5] >
          1 ||
          game === 2)
      ) {
        k = 1;
      } else {
        moves[1] += 2;
        k = 0;
      }
    } else if (
      Last_ + 2 * dice[0] + 2 * dice[1] === New_ &&
      doubles === 1 &&
      moves[0] === 0 &&
      moves[1] === 0
    ) {
      let okfl = 0;
      if (
        !(
          positionMatrix[Last_ + dice[0]][4] === 2 &&
          (positionMatrix[Last_ + dice[0]][3] +
            positionMatrix[Last_ + dice[0]][5] >
            1 ||
            game === 2)
        )
      ) {
        if (
          !(
            positionMatrix[Last_ + 2 * dice[0]][4] === 2 &&
            (positionMatrix[Last_ + 2 * dice[0]][3] +
              positionMatrix[Last_ + 2 * dice[0]][5] >
              1 ||
              game === 2)
          )
        ) {
          if (
            !(
              positionMatrix[Last_ + 3 * dice[0]][4] === 2 &&
              (positionMatrix[Last_ + 3 * dice[0]][3] +
                positionMatrix[Last_ + 3 * dice[0]][5] >
                1 ||
                game === 2)
            )
          ) {
            okfl = 1;
          }
        }
      }

      if (!okfl) {
        k = 1;
      } else {
        moves[0] += 2;
        moves[1] += 2;
        k = 0;
      }
    } else if (
      Last_ + dice[0] + 2 * dice[1] === New_ &&
      doubles === 1 &&
      moves[0] < 2 &&
      moves[1] === 0
    ) {
      let okfl = 0;

      if (
        !(
          positionMatrix[Last_ + dice[0]][4] === 2 &&
          (positionMatrix[Last_ + dice[0]][3] +
            positionMatrix[Last_ + dice[0]][5] >
            1 ||
            game === 2)
        )
      ) {
        if (
          !(
            positionMatrix[Last_ + 2 * dice[0]][4] === 2 &&
            (positionMatrix[Last_ + 2 * dice[0]][3] +
              positionMatrix[Last_ + 2 * dice[0]][5] >
              1 ||
              game === 2)
          )
        ) {
          okfl = 1;
        }
      }
      if (!okfl) {
        k = 1;
      } else {
        moves[0] += 1;
        moves[1] += 2;
        k = 0;
      }
    } else if (
      Last_ + 2 * dice[0] + dice[1] === New_ &&
      doubles === 1 &&
      moves[0] === 0 &&
      moves[1] < 2
    ) {
      let okfl = 0;
      if (
        !(
          positionMatrix[Last_ + dice[0]][4] === 2 &&
          (positionMatrix[Last_ + dice[0]][3] +
            positionMatrix[Last_ + dice[0]][5] >
            1 ||
            game === 2)
        )
      ) {
        if (
          !(
            positionMatrix[Last_ + 2 * dice[0]][4] === 2 &&
            (positionMatrix[Last_ + 2 * dice[0]][3] +
              positionMatrix[Last_ + 2 * dice[0]][5] >
              1 ||
              game === 2)
          )
        ) {
          okfl = 1;
        }
      }

      if (!okfl) {
        k = 1;
      } else {
        moves[0] += 2;
        moves[1] += 1;
        k = 0;
      }
    } else if (Last_ === New_) {
      k = 0;
    } else {
      k = 1;
    }
  } else if (team_ === 2) {
    if (
      Last_ - dice[0] === New_ &&
      ((doubles === 1 && opmoves[0] < 2) || (doubles === 0 && opmoves[0] < 1))
    ) {
      if (opmoves[0] < 1 + doubles) {
        opmoves[0]++;
        k = 0;
      }
    } else if (
      Last_ - dice[1] === New_ &&
      ((doubles === 1 && opmoves[1] < 2) || (doubles === 0 && opmoves[1] < 1))
    ) {
      if (opmoves[1] < 1 + doubles) {
        opmoves[1]++;
        k = 0;
      }
    } else {
      k = 1;
    }
  } else if (team_ === 3) {
    let firstpiece = 1;
    if (
      game === 2 &&
      positionMatrix[23][3] === 14 &&
      positionMatrix[23][4] === 2 &&
      Last_ === 23
    ) {
      firstpiece = 0;
      let fevgcount;
      for (fevgcount = 0; fevgcount <= 11; fevgcount++) {
        if (positionMatrix[fevgcount][4] === 2) {
          firstpiece = 1;
          break;
        }
      }
    }
    if (
      game === 2 &&
      New_ > 17 &&
      New_ < 24 &&
      positionMatrix[New_][4] === 0 &&
      firstpiece
    ) {
      let fevgcount;
      firstpiece = 0;
      for (fevgcount = 23; fevgcount >= 18; fevgcount--) {
        if (
          positionMatrix[fevgcount][4] === 0 ||
          positionMatrix[fevgcount][4] === 1
        ) {
          if (fevgcount === New_) {
            continue;
          }
          firstpiece = 1;
          break;
        }
      }
    }

    if (!firstpiece) {
      return {
        status: 1,
        Last_,
        New_,
        team_,
        positionMatrix,
        dice,
        moves,
        opmoves,
        turn,
        game,
      };
    }

    if (
      positionMatrix[New_][4] === 1 &&
      (positionMatrix[New_][3] + positionMatrix[New_][5] > 1 || game === 2)
    ) {
      return {
        status: 1,
        Last_,
        New_,
        team_,
        positionMatrix,
        dice,
        moves,
        opmoves,
        turn,
        game,
      };
    }
    if (Last_ - dice[0] === New_ && opmoves[0] < doubles + 1) {
      k = 0;
    } else if (Last_ - dice[1] === New_ && opmoves[1] < doubles + 1) {
      k = 0;
    } else {
      k = 1;
    }
  }
  if (turn !== null && turn !== undefined) {
    if (
      (doubles === 1 && moves[0] === 2 && moves[1] === 2) ||
      (doubles === 0 && moves[0] === 1 && moves[1] === 1)
    ) {
      moves[0] = 0;
      moves[1] = 0;
      opmoves[0] = 0;
      opmoves[1] = 0;
      dice[0] = 0;
      dice[1] = 0;
      turn = Math.abs(turn - 1);
    }
  }

  return {
    status: k,
    Last_,
    New_,
    team_,
    positionMatrix,
    dice,
    moves,
    opmoves,
    turn,
    game,
  };
}
