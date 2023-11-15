let endState = {
    preload: loadEndAssets,
    create: createEnd
};


function loadEndAssets() {
    game.load.image('backButton', 'assets/imgs/backButton.png');
    game.load.image('playButton', 'assets/imgs/playButton.png');  
}

function createEnd() {
    game.input.enabled = true;
    let bg = game.add.image(0, 0, 'background');
    bg.scale.setTo(STAGE_WIDHT/BG_WIDHT , STAGE_HEIGHT/BG_HEIGHT);


    let textTitle = 'END';
    let styleTitle = {
        font: 'Arcades',
        fontSize: '90pt',
        fill: '#ffffff',
        stroke: 'darkblue',
        strokeThickness: '10'
    };
    game.add.text(game.world.width - 1300, game.world.height / 7, textTitle, styleTitle);

    let timer = String('Elapsed time:  ' + Math.trunc(time / 60)).padStart(2, "0") + " : " + String(time % 60).padStart(2, "0");
    let styleTimer = {
        font: 'Arcades',
        fontSize: '30pt',
        fill: '#ffffff',
        stroke: 'darkblue',
        strokeThickness: '10'
    };
    game.add.text(game.world.width - 1300, game.world.height / 2.5, timer, styleTimer);

    let score = 'Final Score:  ' +  (lives * 10 + remainingTimeLevel2);  // We do not add any score of level 3 because the four jumps must be used and we would always end up with 0 jumps.


    let styleScore = {
        font: 'Arcades',
        fontSize: '30pt',
        fill: '#ffffff',
        stroke: 'darkblue',
        strokeThickness: '10'
    };
    game.add.text(game.world.width - 1300, game.world.height / 2, score, styleScore);


    let btnBack = game.add.button(game.world.width / 1.7, game.world.height - 60, 'backButton',
        onBackButtonPressedEnd);
    btnBack.anchor.setTo(0.5, 0.5);

    let btnPlay = game.add.button(game.world.width / 2.7, game.world.height - 60, 'playButton',
        onPlayButtonPressedEnd);
    btnPlay.anchor.setTo(0.5, 0.5);
}

function onBackButtonPressedEnd() {
    game.state.start('welcome');
}

function onPlayButtonPressedEnd() {
    levelToPlay = 1;
    game.state.start('play');
}