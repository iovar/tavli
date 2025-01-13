export const SCENES = {
    menu: {
        scene: 'menu',
        actions: [
            { value: 'scene:start_game', label: 'Start Game' },
            { value: 'scene:start_match', label: 'Play a Match' },
            { value: 'scene:options', label: 'Options' },
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
        actions: [
            { value: 'action:roll' },
            { value: 'action:select', position: 0, team: 0 }, // position can be arbitrary 0 - 23
            { value: 'action:move', position: 0, team: 0 },
            { value: 'action:takeout', position: 0, team: 0 },
            { value: 'action:frame', delay: 0 }, // time can be arbitrary number of msecs
            { value: 'action:quit', label: 'Quit' },
            { value: 'scene:menu', label: 'Yes, quit' },
        ],
        state: {
            turn: 0,
            won: -1, // 0, 1, to get the actions, and set score and next game
            showQuit: false,
            allowedMoves: [
                { from: 0, to: 4, dice: 5 },
            ], // -1 means hit. 24 means out (safe)
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
