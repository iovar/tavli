export const ActionPrefix = {
    action: 'action',
    scene: 'scene',
};

export const ActionSeparator = ':';

export const ActionCommand = {
    roll: 'roll',
    select: 'select',
    move: 'move',
    takeout: 'takeout',
    frame: 'frame',
    continue: 'continue',
    quit: 'quit',
};

export const Actions = {
    roll: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.roll}`,
    select: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.select}`,
    move: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.move}`,
    takeout: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.takeout}`,
    frame: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.frame}`,
    continue: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.continue}`,
    quit: `${ActionPrefix.action}${ActionSeparator}${ActionCommand.quit}`,
};

export const SceneActions = {
};
