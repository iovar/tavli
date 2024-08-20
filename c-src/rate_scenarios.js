// Scenario *rate_scenarios(Scenario *root,let game)//,Scenario *best)
export function rate_scenarios(root, game) {
  let best;
  let temp;
  let best_rating = 0;
  temp = root;
  best = null;
  let i = 0;
  let godown = 0;

  if (root.down) {
    godown = 1;
    temp = root.down;
  } else if (root.next) {
    temp = root.next;
  } else {
    return root;
  }

  do {
    let pcpinned = 0;
    let yourpinned = 0;
    let hitchance = 0;
    let total_fevga = 0;
    let fevga_adv = 0;
    let fevga_block = 0;
    let previous_closed = 0;
    let closed_points = 0;
    let total_closed = 0;
    let advancement = 0;
    let retr_closed = 0;
    let retr_open = 0;
    let free_gather = 1;
    let total_retr_area = 0;
    let entr_closed = 0;
    let lastop = -1;
    let firstyours = -1;
    let enemy_seen = 0;
    for (i = 23; i > 17; i--) {
      if (
        temp.positionMatrix[i][4] == 1 &&
        temp.positionMatrix[i][3] + temp.positionMatrix[i][5] > 1
      )
        entr_closed += 1;
    }
    for (i = 0; i < 24; i++) {
      if (
        temp.positionMatrix[i][4] == 1 ||
        (temp.positionMatrix[i][4] == 2 && temp.positionMatrix[i][5] == 1)
      )
        if (lastop == -1) lastop = i;

      if (temp.positionMatrix[i][4] == 1 && temp.positionMatrix[i][5])
        pcpinned += i;

      if (temp.positionMatrix[i][4] == 2) {
        fevga_adv += 24 - i;
        total_fevga++;
        if (temp.positionMatrix[i][5]) yourpinned += 24 - i;

        let to_be_hit = chance_to_be_hit(
          temp.positionMatrix,
          i,
          temp.specs.hitYou,
        );
        firstyours = i;

        let pieces = temp.positionMatrix[i][3];

        if (game == 0) to_be_hit = (to_be_hit * (24 - i)) / 100 + 1;
        else if (game == 1) to_be_hit = (to_be_hit * (i + 1)) / 100 + 1;
        else if (game == 2) to_be_hit = 0;

        assert(!isnan(pieces));
        advancement += temp.specs.outOp * 25;
        if (i < 6) advancement += 20 * pieces;
        else if (i < 12) advancement -= 10 * pieces;
        else if (i < 18) advancement -= 20 * pieces;
        else {
          if (entr_closed < 4 && to_be_hit <= 50)
            advancement -= 100 * (i * pieces);
          else advancement -= 70 * (i * pieces);
        }

        assert(!isnan(advancement));
      }
      if (
        temp.positionMatrix[i][4] == 2 &&
        temp.positionMatrix[i][3] == 1 &&
        temp.positionMatrix[i][5] == 0
      ) {
        let to_be_hit = chance_to_be_hit(
          temp.positionMatrix,
          i,
          temp.specs.hitYou,
        );
        if (game == 0) to_be_hit = (to_be_hit * (24 - i)) / 100 + 1;
        else if (game == 1) to_be_hit = (to_be_hit * (i + 1)) / 100 + 1;
        else if (game == 2) to_be_hit = 0;
        hitchance += (entr_closed + 1) * /*(24-i)**/ to_be_hit;
        previous_closed = 0;
      } else if (
        temp.positionMatrix[i][4] == 2 &&
        temp.positionMatrix[i][3] + temp.positionMatrix[i][5] > 1
      ) {
        if (previous_closed) closed_points += 15;
        total_closed += 1;
        previous_closed = 1;
      } else previous_closed = 0;
    }
    for (i = 0; i < 6; i++) {
      if (temp.positionMatrix[i][3] == 1) retr_open += 1;
      if (temp.positionMatrix[i][4] == 1) enemy_seen = 1;
      if (temp.positionMatrix[i][4] == 2) {
        fevga_block++;
        total_retr_area += temp.positionMatrix[i][3];
        if (enemy_seen) free_gather = 0;
      }
      if (
        temp.positionMatrix[i][4] == 2 &&
        (temp.positionMatrix[i][3] + temp.positionMatrix[i][5] > 1 || game == 2)
      )
        retr_closed += 1;
    }
    if (game == 2) {
      free_gather = 1;
      entr_closed = 0;
      closed_points = 0;
      for (i = 11; i > 5; i--) {
        if (temp.positionMatrix[i][4] == 2) entr_closed++;
        if (temp.positionMatrix[i][4] == 1) free_gather = 0;
      }
      for (i = 17; i > 11; i--) {
        if (temp.positionMatrix[i][4] == 2) closed_points++;
      }
    }

    //calculate rating based on results
    let rating = 0;
    //retrieval - entry hit criterion
    if (game == 0) {
      if (entr_closed > 2 && entr_closed < 5) rating -= entr_closed * hitchance;
      else if (entr_closed > 4) rating -= 1000 * hitchance;
      //try to block out
      if (retr_closed > 2 && retr_closed > entr_closed && entr_closed < 3)
        rating += (retr_closed - entr_closed) * hitchance;
      //retrieval - entry simple criterion
      rating += (retr_closed - entr_closed) * 20;

      //hit op criterion
      if (temp.specs.hitOp > 0) rating -= temp.specs.hitOp * 100;
      //hit you criterion
      if (temp.specs.hitYou > 0) {
        if (retr_open && temp.specs.hitYou - retr_open > 0)
          rating = (temp.specs.hitYou - retr_open) * 10;
        else rating += temp.specs.hitYou * 100;
      }
      //retr closed
      if (temp.specs.hitYou > 0 && retr_closed == 6) rating += 100;
      //retr_open
      rating -= retr_open * 20;
      //keep closed /gather faster/ try to hit
      if (temp.specs.outOp < temp.specs.outYou && retr_open == 0)
        rating += 100 * (retr_closed + 1) * temp.specs.hitOp;
      //free move
      if (advancement != 0) {
        if (lastop > firstyours && temp.specs.hitYou == 0)
          rating = 100 * advancement;
        else rating += advancement;
      }
      //out you criterion
      if (temp.specs.outOp > 0) {
        if (
          temp.specs.hitYou <= 0 &&
          free_gather &&
          total_retr_area + temp.specs.outOp == 15 &&
          temp.specs.outOp > 0
        ) {
          rating += (temp.specs.outOp + 1) * 5000 * 10; //quick gather
        } else rating += temp.specs.outOp * 5;
      }
    }

    if (game == 1) {
      let count = 0;
      for (count = 0; count < 6; count++) {
        if (
          temp.positionMatrix[count][3] == 1 &&
          temp.positionMatrix[count][4] == 2 &&
          temp.positionMatrix[count][5] == 0
        )
          rating -= pow(10, 7 - count);
      }

      for (count = 23; count > 17; count--) {
        if (
          temp.positionMatrix[count][4] == 2 &&
          temp.positionMatrix[count][5] == 1
        )
          rating += temp.positionMatrix[count][3] * pow(10, count - 16);
      }
      rating += (total_closed + closed_points + 1) * pcpinned;
      rating += yourpinned * 100;
    }
    if (game == 1 || game == 2) {
      //close corners 18 17 12 11 6 5
      if (
        (temp.positionMatrix[18][3] + temp.positionMatrix[18][5] > 1 ||
          game == 2) &&
        temp.positionMatrix[18][4] == 2
      )
        rating += game == 1 ? 100 : 100;
      if (
        (temp.positionMatrix[17][3] + temp.positionMatrix[17][5] > 1 ||
          game == 2) &&
        temp.positionMatrix[17][4] == 2
      )
        rating += game == 1 ? 150 : 100;
      if (
        (temp.positionMatrix[12][3] + temp.positionMatrix[12][5] > 1 ||
          game == 2) &&
        temp.positionMatrix[12][4] == 2
      )
        rating += game == 1 ? 200 : 100;
      if (
        (temp.positionMatrix[11][3] + temp.positionMatrix[11][5] > 1 ||
          game == 2) &&
        temp.positionMatrix[11][4] == 2
      )
        rating += game == 1 ? 250 : 100;
      if (
        (temp.positionMatrix[6][3] + temp.positionMatrix[6][5] > 1 ||
          game == 2) &&
        temp.positionMatrix[6][4] == 2
      )
        rating += game == 1 ? 300 : 100;
      if (
        (temp.positionMatrix[5][3] + temp.positionMatrix[5][5] > 1 ||
          game == 2) &&
        temp.positionMatrix[5][4] == 2
      )
        rating += game == 1 ? 350 : 100;
    }

    if (game == 0 || game == 1) {
      //consequent closed criterion
      rating += closed_points;
      //total_closed criterion
      rating += total_closed * 30;
      //hit criterion
      rating -= hitchance;
    }

    if (game == 2) {
      rating += total_fevga * 20;
      rating += fevga_adv;
      rating += retr_closed * (retr_closed >= 2 ? 30 : 90);
      rating += entr_closed * (closed_points >= 3 ? 130 : 110);
      rating += closed_points * (entr_closed >= 3 ? 120 : 100);
      if (temp.specs.outOp > 0) rating += temp.specs.outOp * 10;
      if (free_gather) {
        rating +=
          temp.specs.outOp * 10000 +
          retrieval_area_total(2, temp.positionMatrix) * 50;
      }
      if (!free_gather && fevga_block) rating += 1000000;
    }

    assert(!isnan(rating));
    temp.specs.rating = rating;
    if (!best) best = temp;
    else if (temp.specs.rating >= best.specs.rating) best = temp;
    if (godown) temp = temp.down;
    else temp = temp.next;
  } while (temp);

  return best;
}
