/* int Action(int pos_,int team_, GLint *hitOp, GLint positionMatrix[24][6], GLint *pouliYUp, int game) */
export function Action(pos_, team_, hitOp, positionMatrix, pouliYUp, game) {
  if (team_ == 1) {
    if (pouliYUp.value == 0) {
      if (positionMatrix[pos_][4] == 1) {
        if (positionMatrix[pos_][3] > 0) {
          positionMatrix[pos_][3]--;
          if (positionMatrix[pos_][3] == 0) {
            if (game == 1 && positionMatrix[pos_][5] == 1) {
              positionMatrix[pos_][5] = 0;
              positionMatrix[pos_][4] = 2;
              positionMatrix[pos_][3] = 1;
            } else {
              positionMatrix[pos_][4] = 0;
            }
          }
          pouliYUp.value = 1;
          return 0;
        } else {
          return 1;
        }
      }
    } else if (pouliYUp.value == 1) {
      if (positionMatrix[pos_][4] == 2) {
        if (positionMatrix[pos_][3] == 1 && positionMatrix[pos_][5] == 0) {
          positionMatrix[pos_][4] = 1;
          if (game == 0) {
            hitOp.value += 1;
          } else if (game == 1) {
            positionMatrix[pos_][5] = 1;
          } else if (game == 2) {
            return 0;
          }

          pouliYUp.value = 0;
          return 0;
        }
        return 1;
      } else if (positionMatrix[pos_][4] == 0) {
        positionMatrix[pos_][3] = 1;
        positionMatrix[pos_][4] = 1;
        pouliYUp.value = 0;
        return 0;
      } else if (positionMatrix[pos_][4] == 1) {
        positionMatrix[pos_][3]++;
        pouliYUp.value = 0;
        return 0;
      }
    } else {
      return 1;
    }
  } else if (team_ == 2) {
    if (positionMatrix[pos_][4] == 1) {
      if (positionMatrix[pos_][3] == 1 && game != 2) {
        return 3;
      } else if (positionMatrix[pos_][3] > 1) {
        return 0;
      }
    } else if (positionMatrix[pos_][4] == 0) {
      return 1;
    } else if (positionMatrix[pos_][4] == 2) {
      return 2;
    } else {
      return 0;
    }
  }
}
