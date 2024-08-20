export function fevga_matrix(positionMatrix, dummyMatrix) {
  for (let i = 11; i >= 0; i--) {
    for (let k = 0; k < 6; k++) {
      dummyMatrix[12 + i][k] = positionMatrix[23 - i][k];
    }
  }
  for (let i = 23; i > 11; i--) {
    for (let k = 0; k < 6; k++) {
      dummyMatrix[i - 12][k] = positionMatrix[23 - i][k];
    }
  }

  return 0;
}
