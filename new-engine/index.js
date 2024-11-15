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
// Options Scene with options to enable sound, player colour, oponent colour, back
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

const uiConfig = {

}

export function* tavliGame(extraConfig) {


}
