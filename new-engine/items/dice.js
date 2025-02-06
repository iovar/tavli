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
    const remaining = [...dice.remaining];
    const indexToRemove = remaining.indexOf(to - from);
    if (indexToRemove !== -1) {
        remaining.splice(indexToRemove, 1);
    }

    return {
        ...dice,
        rolled,
        remaining,
        unusable: dice.unusable ?? [],
    };
};
