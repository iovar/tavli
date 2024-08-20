/*
 * int input_exec(int acc_,int strafe_,int button,int gkpr,int x_,int y_,
		GLint positionMatrix[24][6],
		GLint *outYou,
		GLint *outOp,
		GLint *hitYou,
		GLint *hitOp,
		int   *turn,
		GLfloat *xmvr,
		GLfloat *zmvr,
		GLfloat *yrot,
		int dice[2],
		int moves[2],
		int opmoves[2],
		GLint *pouliYUp,
		Uint32 res[3],
		Prefs *prefs,
		int game
		)

*/

export function input_exec(
  button,
  pos,
  positionMatrix,
  outYou,
  outOp,
  hitYou,
  hitOp,
  turn,
  dice,
  moves,
  opmoves,
  pouliYUp,
  prefs,
  game,
) {
  let LastPos = -1;

  if (!positionMatrix) return LastPos;

  if (button == 1) {
    //***************************************take out************************************************
    if (pos == 24 && pouliYUp.value == 1) {
      let tot = retrieval_area_total(1, positionMatrix);
      if (tot + outYou.value == 14 && LastPos >= 18) {
        let doubles = 0;
        let d;
        if (dice[1] == dice[0]) doubles = 1;

        let empty = empty_positions(1, positionMatrix);
        let jum;
        for (jum = 0; jum < 5 && LastPos + jum < 24; jum++) {
          if (positionMatrix[LastPos + jum][4] != 1) empty -= 1;
          else break;
        }
        for (d = 0; d < 2; d++) {
          if (moves[d] < 1 + doubles) {
            if (
              LastPos == 24 - dice[d] ||
              (LastPos == 18 + empty && LastPos >= 24 - dice[d])
            ) {
              console.log(
                "#TAKEOUT:",
                (LastPos - (LastPos % 10)) / 10,
                LastPos % 10,
                "\n",
              );
              outYou.value += 1;
              pouliYUp.value = 0;
              moves[d]++;
              LastPos = -1;
              break;
            }
          }
        }
        if (moves[0] - doubles == 1 && moves[1] - doubles == 1) {
          console.log("#YOUR_TURN:");
          turn = 1;
        }
      }
    }
    //***********************************end take out************************************************

    //*********************************normal play **************************************************
    if (turn == 0 && hitYou.value == 0) {
      if (pos == 24) {
        pos = LastPos;
      }
      if (pouliYUp.value == 1) {
        let firstpiece = 1;
        if (
          game == 2 &&
          positionMatrix[0][3] == 13 &&
          positionMatrix[0][4] == 1 &&
          LastPos == 0
        ) {
          firstpiece = 0;
          let fevgcount;
          for (fevgcount = 12; fevgcount <= 23; fevgcount++)
            if (positionMatrix[fevgcount][4] == 1) {
              firstpiece = 1;
              break;
            }
        }
        if (
          game == 2 &&
          pos >= 0 &&
          pos < 6 &&
          positionMatrix[pos][4] == 0 &&
          firstpiece
        ) {
          firstpiece = 0;
          for (let fevgcount = 5; fevgcount >= 0; fevgcount--)
            if (
              positionMatrix[fevgcount][4] == 0 ||
              positionMatrix[fevgcount][4] == 2
            ) {
              if (fevgcount == pos) continue;
              firstpiece = 1;
              break;
            }
        }
        if (game != 2 || firstpiece) {
          if (
            positionMatrix[pos][4] == 2 &&
            positionMatrix[pos][3] + positionMatrix[pos][5] > 1
          )
            pos = LastPos;
          else if (
            check_action(
              LastPos,
              pos,
              1,
              positionMatrix,
              dice,
              moves,
              opmoves,
              turn,
              game,
            )
          ) {
            pos = LastPos;
          }
        } else pos = LastPos;
      }
      if (pos != 24) {
        Action(pos, 1, hitOp, positionMatrix, pouliYUp, game);
        if (pouliYUp.value == 0) {
          if (LastPos != pos && positionMatrix[pos][4] == 1) {
            console.log(
              "#MOVE:",
              (pos - (pos % 10)) / 10,
              pos % 10,
              (LastPos - (LastPos % 10)) / 10,
              LastPos % 10,
              "\n",
            );
          }
          LastPos = -1;
        }
        if (pouliYUp.value == 1) LastPos = pos;
      }
    }

    //*****************************end normal play **************************************************

    //*******************************insert hit *****************************************************
    else if (turn == 0 && hitYou.value >= 1) {
      let ymoves = [0, 0];
      let doubles = 0;
      let k = 2;
      if (dice[0] == dice[1]) doubles = 1;
      if (
        dice[0] == 1 + pos &&
        ((doubles == 1 && moves[0] < 2) || (doubles == 0 && moves[0] < 1))
      ) {
        ymoves[0]++;
        k--;
      } else if (
        dice[1] == 1 + pos &&
        ((doubles == 1 && moves[1] < 2) || (doubles == 0 && moves[1] < 1))
      ) {
        ymoves[1]++;
        k--;
      } else k = -1;

      if (
        k != -1 &&
        !(positionMatrix[pos][4] == 2 && positionMatrix[pos][3] > 1)
      ) {
        pouliYUp.value = 1;
        if (!Action(pos, 1, hitOp, positionMatrix, pouliYUp, game)) k--;

        if (k == 0) {
          console.log("#TAKEIN:", (pos - (pos % 10)) / 10, pos % 10, "\n");
          hitYou.value -= 1;
          moves[0] += ymoves[0];
          moves[1] += ymoves[1];
        }
        pouliYUp.value = 0;
      }

      if (moves[0] - doubles == 1 && moves[1] - doubles == 1) {
        // 					console_writeline(getenv("HOME"),"#YOUR_TURN\n",getenv("USER"));
        turn = 1;
      }
    }
    //***************************end insert hit ****************************************************
  }
}
