export function retrieval_area_total(who, positionMatrix) {
  let tot = 0;
  let i;
  if (who == 1) {
    for (i = 23; i > 17; i--) {
      if (positionMatrix[i][4] == 1) {
        tot += positionMatrix[i][3];
      }
    }
  } else if (who == 2) {
    for (i = 0; i < 6; i++) {
      if (positionMatrix[i][4] == 2) {
        tot += positionMatrix[i][3];
      }
    }
  }
  return tot;
}
