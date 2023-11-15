//Definitions
const BG_HEIGHT = 747;
const BG_WIDHT = 1280;

let btnInstructions, btnPlay;
let levelToPlay;
let welcomeSound;



let startScreenState = {
    preload: loadAssets,
    create: displayScreen
};


function loadAssets() {
    game.load.image('background', 'assets/imgs/bgLayer.png');                   //background image 800 x 600 px
    game.load.image('instructionsButton', 'assets/imgs/aboutButton.png');       //button how do we play
    game.load.image('playButton', 'assets/imgs/playButton.png');                //button play the game

    game.load.audio('welcomeSnd','assets/sounds/welcome.mp3')

}

function displayScreen() {
    levelToPlay = 1;                //There are 3 scenes 
    game.input.enabled = true;
    let w = game.world.width;
    let h = game.world.height;

    let bg = game.add.image(0, 0, 'background');
    bg.scale.setTo(STAGE_WIDHT/BG_WIDHT , STAGE_HEIGHT/BG_HEIGHT);

    welcomeSound = game.add.audio('welcomeSnd');
    game.sound.setDecodedCallback(welcomeSound, startMusicWelcome, this);



    //TITLE

    let textTitle = 'Time Traveler';
    let styleTitle = {
        font: 'Arcades',
        fontSize: '90pt',
        fill: '#ffffff',
        stroke: 'darkblue',
        strokeThickness: '10'
    };
    game.add.text(game.world.width - 1120, game.world.height / 7, textTitle, styleTitle);

    //NAMES
    let authors = 'Lucía Gonzalez García\nMaría Beatriz Villar López\nAlicia Muñoz López';
    let authorsStyle = {
        font:'20pt PixelatedPusab',
        fill: '#ffffff',
        align: 'right',
        stroke: 'darkblue',
        strokeThickness: '4'
    }
    game.add.text(game.world.width - 450, game.world.height / 1.2, authors, authorsStyle);

    btnInstructions = game.add.button(game.world.width / 1.9, game.world.height / 2.2,
        'instructionsButton', onInstructionsButtonPressed);
    btnPlay = game.add.button(game.world.width / 1.87, game.world.height / 1.5,
        'playButton', onPlayButtonPressed);
}

function startMusicWelcome(){
    welcomeSound.loop=true;
    welcomeSound.play();
}

function onInstructionsButtonPressed() {
    game.state.start('instructions');
}

function onPlayButtonPressed() {
    welcomeSound.stop();
    game.state.start('play');
}
