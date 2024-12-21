export const rollDice = () => {
    const dice = [ Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6) ];
    const remaining = dice[0] === dice[1]
        ? [ dice[0], dice[0], dice[1], dice[1] ]
        : [ dice[0], dice[1] ];

    return {
        dice,
        remaining,
        unusable: [],
    };
}

export const updateDice = ({ from, to }, dice, game, turn) => {

};
