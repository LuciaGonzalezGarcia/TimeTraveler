const STAGE_HEIGHT = 800;
const STAGE_WIDHT = 1400;
let game;

//FUENTES
let wfConfig = {
    active: function () {
        startGame();
    },

    google: {
        families: ['Rammetto One']
    },

    custom: {
        families: ['Arcades', 'PixelatedPusab'],
        urls: ["../assets/fonts/Arcades.ttf", "../assets/fonts/PixelatedPusab.ttf"]

    }
};

WebFont.load(wfConfig);


//JUEGO
function startGame() {
    game = new Phaser.Game(STAGE_WIDHT, STAGE_HEIGHT, Phaser.CANVAS, 'GameStage');

    // Welcome Screen
    game.state.add('welcome', startScreenState);
    // About Screen
    game.state.add('instructions', instructionsState);
    // Play Screen
    game.state.add('play', playState);
    //End Game Screen
    game.state.add('end', endState);


    game.state.start('welcome');
}