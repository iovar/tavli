/* Scenario *list_scenarios(GLint positionMatrix[24][6], */
/* int dice[2], */
/* int mmoves[2], */
/* GLint *hitOp, */
/* GLint *hitYou, */
/* GLint *outOp, */
/* GLint *outYou, */
/* Scenario *root, */
/* int game */
/* ) */
export function list_scenarios(
  positionMatrix,
  dice,
  mmoves,
  hitOp,
  hitYou,
  outOp,
  outYou,
  root,
  game,
) {
  //1st dice************************
  move_scenario(
    positionMatrix,
    dice,
    mmoves,
    hitOp,
    hitYou,
    outOp,
    outYou,
    root,
    0,
    game,
  );

  if (!root) {
    console.log("null SCENARIO !!!!\n");
    throw new Error(-1);
  }

  //2nd dice************************
  let temp;
  temp = root;

  do {
    if (!temp) {
      console.log("null SCENARIO !!!!\n");
      throw new Error(-1);
    }

    move_scenario(
      temp.positionMatrix,
      dice,
      temp.specs.moves,
      temp.specs.hitOp,
      temp.specs.hitYou,
      temp.specs.outOp,
      temp.specs.outYou,
      temp,
      1,
      game,
    );

    temp = temp.next;
  } while (!temp);

  //serialize list
  let lastDown;
  temp = root;
  lastDown = root.down;
  //find first that goes down
  if (!lastDown) {
    do {
      if (temp.down) {
        //give it to the root;
        root.down = temp.down;
        temp.down = null;
        break;
      }
      temp = temp.next;
    } while (temp);
  }

  //pickup the last downward element
  lastDown = root.down;
  //we can only move once
  if (!lastDown) {
    return;
  }

  while (lastDown.down) {
    lastDown = lastDown.down;
  }
  temp = root.next;
  //we only have one initial action
  if (!temp) {
    return;
  }

  do {
    if (!temp) {
      console.log("null SCENARIO !!!!\n");
      throw new Error(-1);
    }

    if (!temp.down) {
      temp = temp.next;
      continue;
    }
    //connect
    else {
      lastDown.down = temp.down;
      temp.down = null;
    }

    while (lastDown.down) {
      lastDown = lastDown.down;
    }

    temp = temp.next;
  } while (temp);
}
