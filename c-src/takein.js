// int takein(GLint positionMatrix[24][6],int position,int moves[2],int dice[2],int *youhit,int *ophit,int game)
export function takein(
  positionMatrix,
  position,
  moves,
  dice,
  youhit,
  ophit,
  game,
) {
  let doubles = 0;
  if (dice[0] == dice[1]) {
    doubles = 1;
  }

  if (
    check_opaction(positionMatrix, moves, dice, -1, position, ophit, null, game)
  ) {
    for (let d = 0; d < 2; d++) {
      if (moves[d] < 1 + doubles) {
        if (24 - dice[d] == position) {
          if (positionMatrix[position][4] == 1) {
            youhit.value += 1;
            positionMatrix[position][4] = 2;
          } else if (positionMatrix[position][4] == 0) {
            positionMatrix[position][4] = 2;
            positionMatrix[position][3] = 1;
          } else {
            positionMatrix[position][3] += 1;
          }
          moves[d]++;
          props.ophit.value -= 1;
          return 1;
        }
      }
    }
    return 0;
  } else {
    return 0;
  }
}
