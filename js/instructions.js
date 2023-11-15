let instructionsState = {
    preload: loadInstructionsAssets,
    create: showInstructions
};


function loadInstructionsAssets() {
    game.load.image('backButton', 'assets/imgs/backButton.png');
    game.load.image('arrowsButton', 'assets/imgs/Arrows.png');
    game.load.image('spacebarButton', 'assets/imgs/spacebar.png');
}

function showInstructions() {
    let bg = game.add.image(0, 0, 'background');
    bg.scale.setTo(STAGE_WIDHT/BG_WIDHT , STAGE_HEIGHT/BG_HEIGHT);

    let imgAr = game.add.image(1060, 200, 'arrowsButton');
    imgAr.scale.setTo(0.5);
    let imgSp = game.add.image(1060, 450, 'spacebarButton');
    imgSp.scale.setTo(0.5);

    let textTitle = 'Instructions';
    let styleTitle = {
        font:'50pt PixelatedPusab',
        fill: '#ffffff',
        align: 'right',
        stroke: 'darkblue',
        strokeThickness: '8'
    };
    game.add.text(50, 50, textTitle, styleTitle);

    let instructions = 'You will have to bit different levels.\n' ;
    instructions += 'First you start in the Cretaceous Period.You will have to dodge the different meteorites that will appear on your way. Be careful you only have 3 lives!!\n';
    instructions += '\n';
    instructions += 'Then you will travel in time, and you will immerse yourself in the Middle Ages.\n';
    instructions += 'Here a warrior will ask you a series of questions that you must answer correctly in order to enter in the castle.\n';
    instructions += 'You will have to answer 4 questions correctly in just 30 seconds. Hint: to answer the questions keep in mind that you are a man of the middle ages ;)\n';
    instructions += '\n';
    instructions += 'Passing through the castle gate you teleport to the present. You will appear in a department store (which will be familiar to you).\n';
    instructions += 'Here you must jump between boxes to get to the goal. Be careful because you will only have 4 jumps to get it.\n ';
    instructions += 'To jump you have to use the spacebar';


    let instrucText = game.add.text(50, 150, instructions, {
        font: '14pt Rammetto One',
        fill:         '#ffffff',
        stroke: 'darkblue',
        strokeThickness: '3'
    });

    instrucText.wordWrap = true;
    instrucText.wordWrapWidth = game.world.width - 500;

    let btnBack = game.add.button(game.world.width / 2, game.world.height - 60, 'backButton',
        onBackButtonPressed);
    btnBack.anchor.setTo(0.5, 0.5);
}

function onBackButtonPressed() {
    welcomeSound.stop();
    game.state.start('welcome');
}