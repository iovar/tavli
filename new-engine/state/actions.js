import { Actions } from '../constants/actions.js';
export const getRollAction = () => ({
    value: Actions.roll,
    label: 'roll',
});

export const getSelectAction = (position) => ({
    value: Actions.select,
    label: 'select',
    position,
});

export const getMoveAction = (position) => ({
    value: Actions.move,
    label: 'move',
    position,
});

export const getTakeoutAction = () => ({
    value: Actions.takeout,
    label: 'takeout',
});

export const getFrameAction = (delay) => ({
    value: Actions.frame,
    label: 'frame',
});

export const getContinueAction = () => ({
    value: Actions.continue,
    label: 'Back',
});

export const getQuitAction = () => ({
    value: Actions.quit,
    label: 'Quit',
});
