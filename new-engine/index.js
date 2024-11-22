// a game is a state machine, expressed as a saga wich gets input events and returns the next state
// input events are user actions like 'click', 'option select', 'command sent', etc and they vary on context
// every state output should also return the allowed actions. One action is also tick meaning there is no user
// but the game may be moving its state with time. The time has to be decided by the view
//
//


// Allowed states are defined by the scene and the game state
// Main Menu Scene with options to
//  - Start Game
//  - Start Match (3 rounds, 5, 7, 9)
//  - Options (can be freely extended by the view frontend)
//  - Credits

// Start Game Scene with options to select: Placoto, Fevga, Portes, back
// Start Match Scene with options to select: 3, 5, 7, 9, back
// Options Scene with options to select player colour, oponent colour, back
// Credits Scene with option to go back to Main Menu

// Every iteration returns object with the current state
// - every state has then 2 following properties: scene and actions
//  - scene: main menu, start game, start match, options, credits
// - state: the new state that is specific to the view
//
// - Game State
//  - board: the board state
//  - players: the players state
//  - turn: the turn state
//  - game: the game state (out, hit, dice, moved played)
//  - match: the match state
//
// - Menu State
//  - menu options
//
// - actions: the allowed actions

// UI config
const config = {
    options: [
        {
            value: 'player_color',
            label: 'Select your colour',
            values: [
                { value: '#fff', label: 'white' },
                { value: '#000', label: 'black' },
            ],
            selected: undefined,
        },
        {
            value: 'opponent_color',
            label: 'Select oponent\'s colour',
            values: [
                { value: '#000', label: 'black' },
                { value: '#fff', label: 'white' },
            ],
            selected: undefined,
        },
        {
            value: 'board_orientation',
            label: 'Board orientation',
            values: [
                { value: 'top_right', label: 'Top Right' },
                { value: 'top_left', label: 'Top Left' },
                { value: 'bottom_right', label: 'Bottom Right' },
                { value: 'bottom_left', label: 'Bottom Left' },
            ],
            selected: undefined,
        }
    ]
}

//  - scene: main menu, start game, start match, options, credits
const SCENES = {
    menu: {
        scene: 'menu',
        actions: [
            { value: 'scene:options', label: 'Options' },
            { value: 'scene:start_game', label: 'Start Game' },
            { value: 'scene:start_match', label: 'Play a Match' },
            { value: 'scene:credits', label: 'Credits' },
        ],
    },
    options: {
        scene: 'options',
        actions: [
            // get options from UI config
            { value: 'scene:menu', label: 'Back' },
        ],
    },
    credits: {
        scene: 'credits',
        actions: [ { value: 'scene:menu', label: 'Back' } ],
        state: {
            author: 'Ioannis Varouchakis',
            license: 'GNU AFFERO GENERAL PUBLIC LICENSE v3',
            copyright: '2024, 2025',
            contact: '',
            text: '',
        },
    },
    start_game: {
        scene: 'start_game',
        actions: [
            { value: 'scene:game:portes', label: 'Portes' },
            { value: 'scene:game:plakoto', label: 'Plakoto' },
            { value: 'scene:game:fevga', label: 'Fevga' },
            { value: 'scene:menu', label: 'Back' },
        ],
    },
    start_match: {
        scene: 'start_match',
        actions: [
            { value: 'scene:game:match:3', label: '3 Points' },
            { value: 'scene:game:match:5', label: '5 Points' },
            { value: 'scene:game:match:7', label: '7 Points' },
            { value: 'scene:game:match:9', label: '9 Points' },
            { value: 'scene:menu', label: 'Back' },
        ],
    },
    game: {
        scene: 'game',
        // for the game, actions should be generated on every turn
        actions: [
            { value: 'action:roll' },
            { value: 'action:select', position: 0, team: 0 }, // position can be arbitrary 0 - 23
            { value: 'action:move', position: 0, team: 0 },
            { value: 'action:takeout', position: 0, team: 0 },
            { value: 'action:delay', time: 0 }, // time can be arbitrary number of msecs
            { value: 'action:quit', label: 'Quit' },
            { value: 'scene:menu', label: 'Yes, quit' },
        ],
        state: {
            turn: 0,
            allowedPositions: [], // 0 - 24, 24 being out. act different if hit, up, or taking out
            // 0 - 23, array with team number
            board: Array.from({ length: 23 }, () => ([])),
            players: [
                { out: 0, hit: 0, dice: 0, upFrom: 0 /*0 - 23*/ },
                { out: 0, hit: 0, dice: 0, upFrom: 0 /*0 - 23*/ },
            ],
            dice: {
                rolled: [2, 3],
                played: [],
                remaining: [2, 3], // can be more in case of doubles
                unusable: [],
            },
            match: {
                game: '', // portes, plakoto, fevga
                scoreA: 0,
                scoreB: 0,
                maxScore: 3, // 3, 5, 7, 9
            },
        }
    }
};

const getNextScene = (value) => {
    const parts = value.split(':')

    if (parts[0] === 'scene' && parts[1]) {
        return parts[1];
    }
};

const getGameInitState = (action) => {
    const parts = value.split(':')
    const isMatch = parts[2] === 'match';
    const game = (isMatch ? 'portes' : parts[2]) ?? 'portes';
    const maxScore = (isMatch ? Number.parseInt(parts[3]) : 1) ?? 1;

    const match = {
        game,
        maxScore,
        scoreA: 0,
        scoreB: 0,
    };

    return {
        allowedPositions: [],
        board: Array.from({ length: 23 }, () => ([])),
        players: [
            { out: 0, hit: 0, dice: 0, upFrom: 0 },
            { out: 0, hit: 0, dice: 0, upFrom: 0 },
        ],
        dice: {
            rolled: [2, 3],
            played: [],
            remaining: [2, 3],
            unusable: [],
        },
        match,
    };
}

const handleMenuScene = (action, currentScene) => {
    const key = getNextScene(action.value);
    const nextScene = SCENES[key] && globalThis.structuredClone(SCENES[key]);

    return nextScene ?? currentScene;
}

const handleGameSelectScene = (action, currentScene) => {
    const key = getNextScene(action.value);

    if (key && key !== 'game') {
        return handleMenuScene(action, currentScene);
    }

    if (key === 'game') {
        const nextScene = globalThis.structuredClone(SCENES.game);
        const initState = getGameInitState(action);
        // TODO get actions, too

        return {
            ...nextScene,
            state: {
                // TODO must setup board, possible actions, dice, etc?
                ...nextScene.state,
                ...initState,
            },
        };
    }

    return currentScene;
}

const handleScene = (action, currentScene) => {
    switch(currentScene.scene) {
        case 'menu':
        case 'credits':
            return handleMenuScene(action, currentScene);
        case 'game':
            return handleGameSelectScene(action, currentScene);
        default:
            return currentScene;
    }
};

export function* tavliGame(config) {
    let running = true;
    let currentScene = globalThis.structuredClone(SCENES.menu);

    while (running) {
        const action = yield currentScene;
        console.log('hi', action);
        currentScene = handleMenuScene(action, currentScene);
    }
}
