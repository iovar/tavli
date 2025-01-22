export const rollDice = () => {
    const rolled = [ Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6) ];
    const remaining = rolled[0] === rolled[1]
        ? [ rolled[0], rolled[0], rolled[1], rolled[1] ]
        : [ rolled[0], rolled[1] ];

    return {
        rolled,
        remaining,
        unusable: [],
    };
}

export const updateDice = ({ from, to }, dice) => {
    const rolled = dice.rolled;
    const remaining = dice.remaining.filter(i => i !== to - from);
    const unusable = [];

    return {
        ...dice,
        rolled,
        remaining,
        unusable,
    };
};
