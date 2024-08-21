// int chance_to_be_hit(GLint positionMatrix[24][6],int position,int hitOp,int game)
export function chance_to_be_hit(positionMatrix, position, hitOp, game) {
  let who;
  let chance = 0;
  //check who called and if no calculating is needed
  if (positionMatrix[position][4] === 2) {
    who = 2;
    if (positionMatrix[position][3] >= 2 || positionMatrix[position][5] === 1) {
      return 0;
    }
  } else if (positionMatrix[position][4] === 1) {
    return 0;
  } else if (positionMatrix[position][4] === 0) {
    return 0;
  }

  if (who === 2) {
    if (!game) {
      if (position >= 0 && position < 6 && hitOp > 0) {
        chance += 1667;
      }
    }

    let blocked = 0;
    let i = 0;
    for (i = position - 1; i >= position - 6; i--) {
      if (i < 0) {
        return chance;
      }
      if (positionMatrix[i][4] === 2 && positionMatrix[i][3] > 1) {
        blocked += 1;
      }
      if (positionMatrix[i][4] === 1 && blocked < 6) {
        const tchance = (6 - position + i - blocked + 2) * 278;
        if (tchance > 0) {
          chance += 1667 + tchance;
        }
      }
    }
    for (i = position - 7; i >= position - 12; i--) {
      if (i < 0) {
        return chance;
      }
      if (positionMatrix[i][4] === 1 && blocked < 6) {
        const tchance = (13 - (position - i) - blocked + 2) * 278;
        if (tchance > 0) {
          chance += tchance;
        }
      }
    }
    if (chance < 0) {
      chance = 0;
    }

    return chance;
  }

  return 0;
}
