// COMMON CONSTANTS //
const BODY_GRAVITY = 550;
const PLAYER_VELOCITY = 150;
const PARALLAX_1 = 0.05;                //Three parallax velocities
const PARALLAX_2 = 0.25;
const PARALLAX_3 = 0.5;

// CONSTANTS LEVEL 1 //
const WORLD_WIDTH1 = 4000
const WORLD_HEIGHT1 = 825
const METEORITE_GROUP_SIZE=20;
const TIMER_RHYTHM = 0.1*Phaser.Timer.SECOND;

const EJE_X = [-100,0,-70,90];
const EJE_Y = [70,100,60,90];


//CONSTANTS LEVEL 2
const WORLD_WIDTH2 = 2000
const WORLD_HEIGHT2 = 825
const QUEST_TO_WIN = 4;                 // Hits to pass the challenge of level 2
const DEFAULT_TIME_LEVEL2 = 30;         // Time to pass the challenge of level 2
const FIRST_LETTER_POS = 870;           // The position of the first letter
const DIF_POS = 55;                     // The space between letters


// CONSTANTS LEVEL 3 //
const WORLD_WIDTH3 = 2000
const WORLD_HEIGHT3 = 825
const PACKAGE_VELOCITY = 0.85;
const LONG_PLATFORM = 1.7;
const MAX_JUMPS = 4;                //Max numbber of jumps allowed
const DEAD_LINE_Y = 798;            //Line where the player dies
const CHAIN_Y = 285;
const CHAIN_X = 385;
const END_CHAIN1 = 485;
const END_CHAIN2 = 685;
const END_CHAIN3 = 885;

const VELOCITY_PACKAGE = 0.8;
const INTERVAL_1 = 510;             //Intervals of package's movement
const INTERVAL_2_MIN = 600; 
const INTERVAL_2_MAX = 710;
const INTERVAL_3_MIN = 800;
const INTERVAL_3_MAX = 910;


let levelsData = ['assets/levels/level01.json', 'assets/levels/level02.json', 'assets/levels/level03.json'];

let playState = {
    preload: loadPlayAssets,
    create: createLevel,
    update: updateLevel,
};


// COMMON VARIABLES //
let bg1, bg2, bg3;                          // We use three background variables for the parallax effects
let hudGroup;
let levelConfig;
let platforms, ground;
let player, cursors, spacebar;
let playerPlatform;
let hitPlatform;
let exitingLevel;
let exit;
let jumpSound;
let clock;
let time;



// VARIABLES LEVEL 1 //
let meteorites;
let lives;
let currentMeteoriteProbability;
let currentMeteoriteVelocity;
let hudLives;
let sound_game,shout;



// VARIABLES LEVEL 2 //
let remainingTimeLevel2;
let timerClockLevel2;
let hudTime;
let warrior;                                    // Object with which we collide to start the questions.

let inChallenge, walking, inTransition;         // inChallenge helps us to check if the player is in the challenge or if he has already passed it (we use it for reasons of collision with the warrior).
                                                // we use walking to differentiate the keyboard and cursos inputs (so that the character does not move when we are doing the challenge
                                                // and so that no letter is written on the screen if we are out of the challenge).
                                                // we use inTransition so that while we are going from one question to another, pressed letters are not detected (we use it to avoid errors
                                                // when we call functions using time events.)

let imgQuestions, answers;                      // Image arrays (questions) and solutions                     
let hits, text, posAnswer;                      // Hits, answer text and position of the letter that will be shown on the screen
let letters;                                    // Group of letters
let medievalSound, hitSound, errorSound;



// VARIABLES LEVEL 3 //
let hitPackages;
let platformsPackages;
let playerPlatformPackage, tweenP;
let playerJumps = 0;
let hudJump;
let jumping = false;            //True when player is jumping
let hasCollidedPackage = false; //True when player collides a package
let package;
let gameMusic, machineSound, dieSound;
let roof, chain1, chain2, chain3, packdeco, pointer, bucket, mop, post;
let  tweenC1, tweenC2, tweenC3;
//ARRAY BOOLEAN PACKAGES
let boolCollisionsPackages = [];





//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                           CODE CORRESPONDING TO THE LOAD                                 //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadPlayAssets() {
    loadSprites();
    loadImages();
    loadSounds();
    loadLevel(levelToPlay);
    game.tweens.frameBased = true;          //If I did not put this, the tweens would run at different velocities depending on the computer which runs the game.
                                            //This forces the tween to use the frames instead of the time.
}

function loadSprites() {
    game.load.atlasJSONHash('PlayerSpritesheet', 'assets/atlas/PlayerSpritesheet.png','assets/atlas/PlayerSpritesheet.json');

}

function loadImages() {
    // COMMON IMAGES //
    game.load.image('exit', 'assets/imgs/exit.png');



    // IMAGES LEVEL 1 //
    game.load.image('bgcloud', 'assets/imgs/level1/clouds.png');
    game.load.image('bgsea', 'assets/imgs/level1/sea.png');
    game.load.image('bgpiedras', 'assets/imgs/level1/far-grounds.png');

    game.load.image('suelo','assets/imgs/level1/suelo.png');
    game.load.image('plataforma', 'assets/imgs/level1/plataformas/plat_suelo2.png');
    game.load.image('plataforma2','assets/imgs/level1/plataformas/platform.png');
    game.load.image('plat_flotante','assets/imgs/level1/plataformas/plataforma_flotante.png');
    game.load.image('puente','assets/imgs/level1/plataformas/puente.png');
    game.load.image('piedra_flotante_peque','assets/imgs/level1/plataformas/piedra_flotante_pequenas.png');
    game.load.image('roca_flotante','assets/imgs/level1/plataformas/roca_flotante.png');

    game.load.image('meteorite','assets/imgs/level1/meteorito.png');
    


    // IMAGES LEVEL 2 //
    game.load.image('bg1Level2', 'assets/imgs/level2/bg1Play2.png');                           // Backgrounds for parallax effect
    game.load.image('bg2Level2', 'assets/imgs/level2/bg2Play2.png');
    game.load.image('bg3Level2', 'assets/imgs/level2/bg3Play2.png');

    game.load.image('door', 'assets/imgs/level2/puerta.png');                                // Object to exit the level
    game.load.image('ground2', 'assets/imgs/level2/platform2.png');                            
    game.load.image('warrior', 'assets/imgs/level2/warrior.png');                              // Object to start the challenge

    game.load.image('intro', 'assets/imgs/level2/questions/intro.png');                        // Images of  messages different from questions.
    game.load.image('correct', 'assets/imgs/level2/questions/correct.png');
    game.load.image('error', 'assets/imgs/level2/questions/error.png');
    game.load.image('congratulations', 'assets/imgs/level2/questions/congrats.png');

    game.load.image('boots', 'assets/imgs/level2/questions/boots.png');                       // Question images
    game.load.image('helmet', 'assets/imgs/level2/questions/helmet.png');
    game.load.image('sword', 'assets/imgs/level2/questions/sword.png');
    game.load.image('shield', 'assets/imgs/level2/questions/shield.png');
    game.load.image('castle', 'assets/imgs/level2/questions/castle.png');
    game.load.image('knight', 'assets/imgs/level2/questions/knight.png');
    game.load.image('witch', 'assets/imgs/level2/questions/witch.png');
    game.load.image('potion', 'assets/imgs/level2/questions/potion.png');
    game.load.image('roman', 'assets/imgs/level2/questions/roman.png');
    game.load.image('earth', 'assets/imgs/level2/questions/earth.png');



    // IMAGES LEVEL 3 //
    game.load.image('bg1', 'assets/imgs/level3/BackgroundIndustrial1.png');
    game.load.image('bg2', 'assets/imgs/level3/BackgroundIndustrial2.png');
    game.load.image('bg3', 'assets/imgs/level3/BackgroundIndustrial3.png');
    game.load.image('ground', 'assets/imgs/level3/L3platform.png');
    game.load.image('package', 'assets/imgs/level3/Package.png');
    game.load.image('roof', 'assets/imgs/level3/roofIndustrial.png');
    game.load.image('chain', 'assets/imgs/level3/chain.png');

    game.load.image('packdeco', 'assets/imgs/level3/PackageDecoration.png');
    game.load.image('pointer', 'assets/imgs/level3/Pointer.png');
    game.load.image('mop', 'assets/imgs/level3/Mop.png');
    game.load.image('bucket', 'assets/imgs/level3/Bucket.png');
    game.load.image('post', 'assets/imgs/level3/post.png');
 
    
}

function loadSounds() {
    // COMMON IMAGES //
    game.load.audio('jump', 'assets/sounds/jump.wav');

    // SOUNDS LEVEL 1 //
    game.load.audio('musica_fondo','assets/sounds/level1/music_jungle.wav');
    game.load.audio('shout','assets/sounds/level1/shout.wav');
    
    // SOUNDS LEVEL 2 //
    game.load.audio('medievalSnd','assets/sounds/level2/medieval.mp3');
    game.load.audio('hitSnd','assets/sounds/level2/hit.mp3');
    game.load.audio('errorSnd','assets/sounds/level2/error.wav');

    // SOUNDS LEVEL 3 //
    game.load.audio('gameTheme', 'assets/sounds/level3/gameTheme.wav');
    game.load.audio('machine', 'assets/sounds/level3/machine.wav');  
    game.load.audio('die', 'assets/sounds/level3/dieSound.wav');
}

function loadLevel(level) {
    game.load.text('level', levelsData[level - 1], true); 
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                           CODE CORRESPONDING TO THE CREATE                                  ///////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createLevel() {
    exitingLevel = false;
    inChallenge = false;
    walking = true;

    // Get level data from JSON
    levelConfig = JSON.parse(game.cache.getText('level'));
    clock = game.time.events.loop(Phaser.Timer.SECOND, updateTime, this);

    
    // LEVEL 1 //                                                                                     // For each level we establish its bounds, its backgrounds, the level's output object and other properties of its own.
    if(levelToPlay == 1){
        // Set World bounds
        game.world.setBounds(0, 0, WORLD_WIDTH1, WORLD_HEIGHT1);

        // Background
        bg1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bgcloud');
        bg2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bgsea');
        bg3 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bgpiedras');

        // Collide with this image to exit level
        exit = game.add.sprite(game.world.width - 100, game.world.height - 30, 'exit');

        // set lives
        lives = 3;

        createMeteorites(METEORITE_GROUP_SIZE);

        time = 0;   // We initialize global timer 
        
    }
    
    // LEVEL 2 //
    if(levelToPlay == 2){
        // Set World bounds
        game.world.setBounds(0, 0, WORLD_WIDTH2, WORLD_HEIGHT2);;

        // Background
        bg1 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg1Level2');
        bg2 = game.add.tileSprite(0, 0, game.world.width, game.world.height, 'bg2Level2');
        bg3 = game.add.image(0, 0, 'bg3Level2');

        // Collide with this image to exit level
        exit = game.add.sprite(game.world.width - 95, game.world.height - 128, 'door');
        exit.scale.setTo(0.5);

        //Set time
        remainingTimeLevel2 = DEFAULT_TIME_LEVEL2;              

        //Questions
        warrior = game.add.sprite(levelConfig.questionsData.x, game.world.height - levelConfig.questionsData.y, 'warrior');    
        warrior.scale.setTo(0.2);
        game.physics.arcade.enable(warrior);
        
    }

    // LEVEL 3 //
    if(levelToPlay == 3){
        // Set World bounds
        game.world.setBounds(0, 0, WORLD_WIDTH3, WORLD_HEIGHT3);

        // Background
        bg1 = game.add.tileSprite(0, 25, game.world.width, game.world.height, 'bg1');
        bg2 = game.add.tileSprite(0, 25, game.world.width, game.world.height, 'bg2');
        bg3 = game.add.tileSprite(0, 25, game.world.width, game.world.height, 'bg3');

        // Collide with this image to exit level
        exit = game.add.sprite(game.world.width - 100, game.world.height - 64, 'exit');

        //Decorations (roof and chains)
        roof = game.add.image(300, 30,  'roof');
        roof.scale.setTo(2);
        chain1 = game.add.sprite(CHAIN_X, CHAIN_Y,  'chain');
        chain1.scale.setTo(0.9);
        chain2 = game.add.sprite(CHAIN_X + 200, CHAIN_Y,  'chain');
        chain2.scale.setTo(0.9);
        chain3 = game.add.sprite(CHAIN_X + 400, CHAIN_Y,  'chain');
        chain3.scale.setTo(0.9);

        packdeco = game.add.image(1300, 705,  'packdeco');
        packdeco.scale.setTo(1.8);
        pointer = game.add.image(300, 705,  'pointer');
        pointer.scale.setTo(1.8);
        bucket = game.add.image(1200, 700,  'bucket');
        bucket.scale.setTo(1.8);
        mop = game.add.image(1185, 700,  'mop');
        mop.scale.setTo(1.8);
        post = game.add.image(100, 650,  'post');
        post.scale.setTo(0.8);

    }
 

    // COMMON //
    game.physics.arcade.enable(exit);
    exit.anchor.setTo(0, 1);

    platforms = game.add.group();
    platforms.enableBody = true;

    platformsPackages = game.add.physicsGroup();
    platformsPackages.enableBody = true;


    // Create sounds
    createSounds();


    // Create ground and platforms according to JSON data
    createPlatform();
    createStones();
    createRocks();
    createBridge();
    createPlatforms2();
    createSuelos();
    createFloatingRock();

    createGround();

    createPackages();


    //Create the HUD
    createHUD();


    // Create player. Initial position according to JSON data
    player = game.add.sprite(levelConfig.playerStart.x, game.world.height - levelConfig.playerStart.y, 'PlayerSpritesheet', 'Idle000.png');
    player.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(player);
    player.scale.setTo(1.5);

    player.body.bounce.y = 0.2;               
    player.body.gravity.y = BODY_GRAVITY;
    player.body.collideWorldBounds = true;
    
    // Camera follows the player inside the world
    game.camera.follow(player);

    //  Animations
    player.animations.add('run', Phaser.Animation.generateFrameNames('Running', 0, 7, '.png', 3), 15, true, false);
    player.animations.add('idle_animation', Phaser.Animation.generateFrameNames('Idle', 0, 11, '.png', 3), 15, true, false);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
   

    
}

function createSounds() {
    
    jumpSound = game.add.audio('jump', 3);                              //More volume to the jump

    if (levelToPlay==1){
        sound_game=game.add.audio('musica_fondo');
        game.sound.setDecodedCallback(sound_game, startMusic, this);
        shout=game.add.audio('shout');
    }

    if (levelToPlay == 2){
        medievalSound = game.add.audio('medievalSnd');
        hitSound = game.add.audio('hitSnd', 7);                         //More volume to the hit
        errorSound = game.add.audio('errorSnd', 5);                     //More volume to the error
        game.sound.setDecodedCallback(medievalSound, startMusic, this);
    }

    if (levelToPlay == 3){
        machineSound = game.add.audio('machine');
        gameMusic = game.add.audio('gameTheme');       
        dieSound = game.add.audio('die');
        game.sound.setDecodedCallback(gameMusic, startMusic, this);
    }
    
}

function startMusic(){
    if (levelToPlay == 1){
        sound_game.loop=true;
        sound_game.play();
    }
    if (levelToPlay == 2){
        sound_game.stop();
        medievalSound.loop = true;
        medievalSound.play();
    }
    if (levelToPlay == 3){
        medievalSound.stop();
        gameMusic.loop = true;
        gameMusic.play(); 
    }  
}

function createHUD() {
    hudGroup = game.add.group();                                                            // We created a group for the HUD
    
    if (levelToPlay == 1){
        hudLives = game.add.text(20, 5, 'Lives:  ' + lives, {                                   // At level 1 only the life counter appears
            font: 'bold 20pt Arcades',
            fill: '#714E03'
        });
        hudGroup.add(hudLives);
    }

    if (levelToPlay == 2){
        hudTime = game.add.text(20, 5, setRemainingTimeLevel2(remainingTimeLevel2), {           // At level 2 only the timer appears
            font: 'bold 20pt Arcades',
            fill: '#714E03'
        });
        hudGroup.add(hudTime);
    }

    if (levelToPlay == 3){
        hudJump = game.add.text(20, 5, 'Jumps:  '+ (MAX_JUMPS - playerJumps), {                 // At level 3 only the jump counter appears
            font: 'bold 20pt Arcades',
            fill: '#b60404'
        });
        hudGroup.add(hudJump);
    }
    
    hudGroup.fixedToCamera = true;                                                              // The HUD is attached to the camera so that it always appears on the screen
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                    CODE CORRESPONDING TO THE LEVEL 2 AND 3 CREATE                                 /////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function createGround() {
    // LEVEL 2 //
    if(levelToPlay == 2){
        ground = platforms.create(0, game.world.height - 128, 'ground2');
        ground.body.immovable = true;
    }

    // LEVEL 3 //
    if(levelToPlay == 3){
        ground = platforms.create(0, game.world.height - 64, 'ground');
        ground.scale.setTo(LONG_PLATFORM, 2); 
        ground.body.immovable = true;

        ground = platforms.create(1000, game.world.height - 64, 'ground');
        ground.scale.setTo(LONG_PLATFORM, 2); 
        ground.body.immovable = true;
        ground = platforms.create(1380, game.world.height - 64, 'ground');
        ground.scale.setTo(LONG_PLATFORM, 2); 
        ground.body.immovable = true;
        ground = platforms.create(1760, game.world.height - 64, 'ground');
        ground.scale.setTo(LONG_PLATFORM, 2); 
        ground.body.immovable = true;
    }
    

}

//Packages creation (level 3)
function createPackages() {
    levelConfig.packageData.forEach(createPackage, this);
}

function createPackage(element) {
    package = platformsPackages.create(element.x, game.world.height - element.y, 'package');
    boolCollisionsPackages.push(false);
    package.scale.setTo(1.5);
    
    package.body.immovable = true;
    package.body.allowGravity = false;
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                          CODE CORRESPONDING TO THE LEVEL 1 CREATE                                 /////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//METEORITE
function createMeteorites(number){
    meteorites=game.add.group();
    meteorites.enableBody=true;
    meteorites.createMultiple(number,'meteorite');
    meteorites.callAll('events.onOutOfBounds.add','events.onOutOfBounds',resetMember);
    meteorites.callAll('anchor.setTo','anchor',0.5,1.0);
    meteorites.setAll('checkWorldBounds',true);

    currentMeteoriteProbability=0.2;
    currentMeteoriteVelocity=70;
    game.time.events.loop(TIMER_RHYTHM,activateMeteorite,this);     //controls the  movement

}

function activateMeteorite(){
    if(Math.random()<currentMeteoriteProbability){
        let meteorite=meteorites.getFirstExists(false);
        if (meteorite){

            meteorite.body.setSize(252, 224, 100, 530);
            meteorite.scale.setTo(0.15); 
            let uw = meteorite.body.width;       
            let x = Math.floor(Math.random()*(game.world.width-1000+1)+1000); //RANDOM CONTROLLED IN AN INTERVAL
            let z = uw / 2 + x;
            
            meteorite.reset(z,0);
            
            var ind_xy = Math.floor(Math.random()* EJE_X.length);
            
            if (EJE_X[ind_xy]>0){                       //Rightward movement of the meteorites
                meteorite.angle=0
                meteorite.scale.setTo(-0.15, 0.15);
            }
            else if (EJE_X[ind_xy]==0){                 //Vertical movement of the meteorites
                meteorite.angle=-45;
                meteorite.body.setSize(252, 224, 50,720);
            }
            
            else meteorite.angle=0;                     //Leftward movement of meteorites
            
            meteorite.body.velocity.x=EJE_X[ind_xy];
            meteorite.body.velocity.y=EJE_Y[ind_xy];

          
               
            
            
        }
    }
}

function meteoriteHitsPlayer(player,meteorite){
    if(lives<=1){
        shout.play();
        meteorites.forEach(resetMember, this);
        player.x =levelConfig.playerStart.x;
        player.y = game.world.height -levelConfig.playerStart.y;
        lives =3 ;
        hudLives.setText('Lives:  ' + lives);
        

    }
    else {
        
        meteorite.kill();
        lives--;
        shout.play();
        hudLives.setText('Lives:  ' + lives);
        
        // Injured animation                                                                  
        let twen= game.add.tween(player).to({
            alpha: 0.0
        }, 50, Phaser.Easing.Bounce.Out)
        .to({
            alpha: 0.8
        }, 50, Phaser.Easing.Bounce.Out)
        .to({
            alpha: 1.0
        }, 50, Phaser.Easing.Circular.Out);

        twen.start();
        
    }
}

function resetMember(item) {
    item.kill();
}

//PLATFORM_INITIAL

function createPlatform() {
    let plataforma = platforms.create(levelConfig.platData.x, levelConfig.platData.y, 'plataforma');
    plataforma.scale.setTo(2, 2); 
    plataforma.body.setSize(157, 100,0,20);
    plataforma.body.immovable = true;

   
}



//GROUP STONES                                                                      
function createStones() {
    levelConfig.piedraData.forEach(createStone, this);
}
//EACH STONE
function createStone(element) {
    let piedra = platforms.create(element.x, game.world.height - element.y, 'piedra_flotante_peque');
    piedra.body.setSize(67, 50,25,30);

     
    piedra.body.immovable = true;
    
}

//GROUP ROCKS
function createRocks() {
    levelConfig.rocaData.forEach(createRock, this);
}
//EACH ROCK
function createRock(element) {
    let roca = platforms.create(element.x, game.world.height - element.y, 'roca_flotante');
    roca.body.setSize(150, 100,0,30);

    roca.body.immovable = true;
    
}

//PLATFORM_TWO
function createPlatforms2() {
    levelConfig.plat2Data.forEach(createPlatform2, this);
}
function createPlatform2(element) {
    let plataforma2 = platforms.create(element.x, game.world.height - element.y, 'plataforma2');
    plataforma2.scale.setTo(1.5); 
    plataforma2.body.setSize(300, 260,325,20);
    plataforma2.body.immovable = true;

   
}
//GROUND

function createSuelos() {
    levelConfig.sueloData.forEach(createSuelo, this);
}

function createSuelo(element) {
    let suelo = platforms.create(element.x, game.world.height - element.y, 'suelo');
    suelo.scale.setTo(1.5); 
    suelo.body.setSize(400, 50,0,40);
    suelo.body.immovable = true;

   
} 

//BRIDGE
function createBridge() {
    let puente = platforms.create( 2687, 580, 'puente');
    puente.scale.setTo(-1); 
    puente.body.setSize(180, 7,20,25);
    puente.body.immovable = true;

   
}

//FLOATING ROCK
function createFloatingRock() {
    let RockFlotante = platforms.create( 3250, 520, 'plat_flotante');
    RockFlotante.body.setSize(170, 110,30,40);
    RockFlotante.body.immovable = true;

   
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                           CODE CORRESPONDING TO THE UPDATE                                 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function updateLevel() {
    hitPlatform = game.physics.arcade.collide(player, platforms, playerInPlatform, null, this);
    
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;
    
    if (!exitingLevel){
        game.physics.arcade.overlap(player, exit, endLevel, null, this);
    }

    if (levelToPlay == 1){
        game.physics.arcade.overlap(player,meteorites,meteoriteHitsPlayer,null,this);
        movePlayer();
    }

    if (levelToPlay == 2){
        // Check if player is in the challenge of the level 2 or if he has passed it.
        if (!inChallenge){
            movePlayer();
            game.physics.arcade.overlap(player, warrior, initQuestions, null, this);
        }
    
        // Check if player is out of the questions of the level 2
        if (walking){
            movePlayer();
        }
    }
    if (levelToPlay == 3){
        hitPackages = game.physics.arcade.collide(player, platformsPackages, playerInPackage, null, this);
        movePlayer();
    }

}

function movePlayer(){
    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -PLAYER_VELOCITY;
        player.scale.setTo(-1.5, 1.5);
        player.animations.play('run');

        // Paralax effect
        if (player.body.x >= STAGE_WIDHT/2 && levelToPlay == 2){  
            bg1.tilePosition.x += PARALLAX_1;
            bg2.tilePosition.x += PARALLAX_2;
        }

        if (player.body.x>=STAGE_WIDHT/2 && (levelToPlay == 1 || levelToPlay == 3)){
            bg1.tilePosition.x += PARALLAX_1;
            bg2.tilePosition.x += PARALLAX_2;
            bg3.tilePosition.x += PARALLAX_3;    
        }

    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = PLAYER_VELOCITY;
        player.scale.setTo(1.5);
        player.animations.play('run');

        // Paralax effect
        if (player.body.x >= STAGE_WIDHT/2 && levelToPlay == 2){
            bg1.tilePosition.x -= PARALLAX_1;
            bg2.tilePosition.x -= PARALLAX_2;
        }

        if (player.body.x>=STAGE_WIDHT/2 && (levelToPlay == 1 || levelToPlay == 3)){
            bg1.tilePosition.x -= PARALLAX_1;
            bg2.tilePosition.x -= PARALLAX_2;
            bg3.tilePosition.x -= PARALLAX_3;    
        }

    } else {
        //  Stand still
        stopPlayer();
    }

    if (levelToPlay == 1 || levelToPlay == 2){
        // Allow the player to jump if touching the ground.
        if (spacebar.isDown && player.body.touching.down && hitPlatform) {
            player.body.velocity.y = -PLAYER_VELOCITY * 2;
            playerPlatform = undefined;
            jumpSound.play();
        }
    }

    else if (levelToPlay == 3){
        // Allow the player to jump if touching the ground.
        if (spacebar.isDown && player.body.touching.down && (hitPlatform || hitPackages) ) {
            playerJumps += 1;  //If he reaches MAX_JUMPS then he loses
            hudJump.setText('Jumps:  ' + (MAX_JUMPS - playerJumps));
            jumpSound.play();
            jumping = true;
            player.body.velocity.y = -PLAYER_VELOCITY * 2;
            playerPlatform = undefined;
       }
       //If he falls or he run out of jumps, he loses
        if(player.y >= DEAD_LINE_Y || playerJumps > MAX_JUMPS ){
            hudGroup.removeAll();
            machineSound.stop()
            resetPlayer();

        }
        //To make the player moves along with the package
        if(player.body.touching.down && hitPackages && (player.x<= INTERVAL_1 || (player.x >= INTERVAL_2_MIN && player.x <= INTERVAL_2_MAX) || (player.x >= INTERVAL_3_MIN && player.x <= INTERVAL_3_MAX)) ){
            player.x+=VELOCITY_PACKAGE;
        }

        //Stop machine sound
        if(chain1.x >= END_CHAIN1 && player.x<=END_CHAIN1+100){

            machineSound.pause();
        }
        else if(chain2.x >= END_CHAIN2 && player.x<=END_CHAIN2+100){
            machineSound.pause();
        }
        else if(chain3.x >= END_CHAIN3 && player.x<=END_CHAIN3+100){
            machineSound.pause();
        }

        if(chain3.x >= END_CHAIN3) machineSound.stop();
    }
    
}

function stopPlayer() {
    player.animations.play('idle_animation');

}

function playerInPlatform(player, platform) {
    if (player.body.touching.down){
        playerPlatform = platform;
        jumping=false;
    }
}

function playerInPackage(player, package){
    let index = (package.x - 400) / 200;
    jumping=false;
    if (player.body.touching && boolCollisionsPackages[index] == false){
        
        machineSound.play();

        boolCollisionsPackages[index] = true;
        playerPlatformPackage = package;
        tweenP = game.add.tween(package).to( {x: package.x + 100}, 2000, Phaser.Easing.Linear.None);
        tweenP.start();

        //Move chains
        if(boolCollisionsPackages[0] == true && boolCollisionsPackages[1] == false && boolCollisionsPackages[2] == false ){
            tweenC1 = game.add.tween(chain1).to( {x: package.x + 85}, 2000, Phaser.Easing.Linear.None, true);
        }
        else if(boolCollisionsPackages[0] == true && boolCollisionsPackages[1] == true && boolCollisionsPackages[2] == false ){
            tweenC2 = game.add.tween(chain2).to( {x: package.x + 85}, 2000, Phaser.Easing.Linear.None, true);
        }
        else if(boolCollisionsPackages[0] == true && boolCollisionsPackages[1] == true && boolCollisionsPackages[2] == true ){
            tweenC3 = game.add.tween(chain3).to( {x: package.x + 85}, 2000, Phaser.Easing.Linear.None, true);
        }
    }  
    
    
}


function resetPlayer() {
    stopPlayer();                                               
    dieSound.play();
    playerJumps = 0;
    chain1Sound = false;
    chain2Sound = false;
    chain3Sound = false;
    player.x = levelConfig.playerStart.x;
    player.y = game.world.height - levelConfig.playerStart.y;
    //Restart packages and chains
    platformsPackages.removeAll();
    createHUD();
    createPackages();
    
    
    //Reset the tweens if the character falls during a tween (from the chain)
    if(boolCollisionsPackages[0] == true && boolCollisionsPackages[1] == false && boolCollisionsPackages[2] == false )
            tweenC1.pause();

    else if(boolCollisionsPackages[0] == true && boolCollisionsPackages[1] == true && boolCollisionsPackages[2] == false ){
            tweenC1.pause();
            tweenC2.pause();
    }
    else if(boolCollisionsPackages[0] == true && boolCollisionsPackages[1] == true && boolCollisionsPackages[2] == true ){
            tweenC1.pause();
            tweenC2.pause();
            tweenC3.pause();
    }
    //I have to do it like this because if I pause a tween that hasn't been created yet, there is an error
    
    for (let i = 0; i < boolCollisionsPackages.length; i++)
        boolCollisionsPackages[i] = false;

    chain1.x = CHAIN_X;
    chain2.x = CHAIN_X+200;
    chain3.x = CHAIN_X+400;
}


function updateTime() {
    time += 1;             // We update the global timer  
}



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                           CODE CORRESPONDING TO LEVEL 2                                  //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function setRemainingTimeLevel2(seconds) {
    return String('Remaining time:  ' + Math.trunc(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
    // We use this function to create the string that will be shown on the HUD
}


function updateTimeLevel2() {
    remainingTimeLevel2 = Math.max(0, remainingTimeLevel2 - 1);             // We update the timer
    hudTime.setText(setRemainingTimeLevel2(remainingTimeLevel2));           // and the HUD text

    if (remainingTimeLevel2 === 0) {                            // If the time reaches 0 we will repeat the level
        stopPlayer();
        game.time.events.add(1000, repitLevel, this);
    }
}


function initQuestions() {
    inChallenge = true;
    walking = false;
    inTransition = true;

    timerClockLevel2 = game.time.events.loop(Phaser.Timer.SECOND, updateTimeLevel2, this);     // We start the challenge timer

    imgQuestions = ['boots', 'helmet', 'sword', 'shield', 'castle', 'knight', 'witch', 'potion', 'roman', 'earth'];  // We create an array for the images (questions)
    imgQuestionsCopy = imgQuestions.slice();                                                                         // and a copy of it to be modified so that the images do not appear repeated.

    answers = ['boots', 'helmet', 'sword', 'shield', 'castle', 'knight', 'witch', 'potion', 'roman', 'flat'];        // We create an array for the solutions that must be typed
    answersCopy = answers.slice();                                                                                   // and a copy of it to be modified and that matches the array of questions.

    hits = 0;                                       // We initialize the hits to 0

    stopPlayer();
    
    img = game.add.sprite(1000, game.world.height/2.5, 'intro');  // We add the image that introduces the challenge
    img.anchor.setTo(0.5, 0.5);
    img.scale.setTo(0.2);

    game.time.events.add(3000, deleteImg, this);                  // We delete the intro image
    game.time.events.add(3000, showQuestion, this);
    game.input.keyboard.onDownCallback = checkAnswer;       
}

function showQuestion() {
    inTransition = false;

    numQuestion = Math.floor(Math.random() * imgQuestionsCopy.length);    // We get a random integer from the length of the array of possible questions

    quest = game.add.sprite(game.world.width/2, game.world.height/2.5, imgQuestionsCopy[numQuestion]);    // We add the image corresponding to the index of the array
    quest.anchor.setTo(0.5, 0.5);
    quest.scale.setTo(0.2);

    text = '';                               // We initialize the answer text to empty string
    posAnswer = FIRST_LETTER_POS ;           // and the position of the first letter that will be written on the screen.

    letters = game.add.group();             // We create the group of letters to be able to delete them from the screen later
    letters.inputEnableChildren = true;
}

function checkAnswer(e) {
    if(!walking && !inTransition){

        if (e.keyCode >= Phaser.Keyboard.A && e.keyCode <= Phaser.Keyboard.Z) {         // If a key between A and Z is pressed, we add the letter to the answer (text)
            text += e.key;                                                          

            if (text != answersCopy[numQuestion].substring(0, text.length)){    // If the answer (text) do not matches the corresponding substring of the solution, the question will fail and we will display another one.
                inTransition = true;

                errorSound.play();
                recalculateArray();                                      // We call the function to modify the copies of the arrays and that the questions asked do not come out again
                game.time.events.add(500, deleteQuestion, this);       // We delete the question
                game.time.events.add(500, showError, this);          // We show the error message
                game.time.events.add(1500, deleteImg, this);           // We delete the error message
                game.time.events.add(1500, showQuestion, this);         // We show the next question
            }
            else{
                let a = game.add.text(posAnswer, 480, String.fromCharCode(e.key.charCodeAt()- 32),{fontSize: '35px', fill: '#FFFFFF'}, letters);  // We add the letter to the screen and to the group of letters
                a.anchor.setTo(0.5, 0.5);
                posAnswer += DIF_POS;                    // We increase the position in x for the next letter

                if (text.length == answersCopy[numQuestion].length){            // If the length of the answer is the same as the length of the solution, a hit will be added
                    hits += 1;
                    hitSound.play();
                    inTransition = true;

                    game.time.events.add(500, deleteQuestion, this);           // We delete the question         

                    if (hits == QUEST_TO_WIN){                                  // If you get the necessary hits, you will pass the challenge
                        img = game.add.sprite(1000, game.world.height/2.5, 'congratulations');   // We show the message of the end of the challenge
                        img.anchor.setTo(0.5, 0.5);
                        img.scale.setTo(0.2);

                        walking = true;                                                   
                        game.time.events.remove(timerClockLevel2);              // We stop the timer

                        game.time.events.add(3000, deleteImg, this);           // We delete the message of the end of the challenge
                    }
                    else{
                        recalculateArray();                                      // We call the function to modify the copies of the arrays and that the questions asked do not come out again   

                        game.time.events.add(500, showCorrect, this);        // We show the message of success
                        game.time.events.add(1500, deleteImg, this);           // We delete the message of success
                        game.time.events.add(1500, showQuestion, this);         // We show the nextquestion
                    }
               
                }
            }
        
        }
    }
}


function deleteQuestion(){                     // We delete both the image and the group of letters
    quest.destroy(); 
    letters.forEach(deleteLetters, this);
    letters.removeChildren;
}

function deleteLetters(element){
    element.kill();
}


function recalculateArray(){                                     // We divide the array into two parts, omitting the index of the image shown and put them back together.
    qPart1 =  imgQuestionsCopy.slice(0, numQuestion);
    qPart2 = imgQuestionsCopy.slice(numQuestion + 1);
    imgQuestionsCopy = qPart1.concat(qPart2);

    aPart1 =  answersCopy.slice(0, numQuestion);
    aPart2 = answersCopy.slice(numQuestion + 1);
    answersCopy = aPart1.concat(aPart2);

    if (imgQuestionsCopy.length == 0){                          // If the length of the copies stays at 0 we copy the original arrays again
        imgQuestionsCopy = imgQuestions.slice();
        answersCopy = answers.slice();
    }
}


function showCorrect(){                                              // We show the image corresponding to the success message
    img = game.add.sprite(1000, game.world.height/2.5, 'correct');
    img.anchor.setTo(0.5, 0.5);
    img.scale.setTo(0.2);
}

function showError(){                                              // We show the image corresponding to the error message
    img = game.add.sprite(1000, game.world.height/2.5, 'error');
    img.anchor.setTo(0.5, 0.5);
    img.scale.setTo(0.2);
}


function deleteImg(){               // We delete the images that are not a question (intro, success, error, and end of challenge)
    img.destroy();
    
}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////                                           CODE CORRESPONDING TO FINALISING                                 ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function resetInput() {                 // We stop the inputs and reset the instructions of the cursors
    game.input.enabled = false;
    cursors.left.reset(true);
    cursors.right.reset(true);
    cursors.down.reset(true);
    spacebar.reset(true);
}


function endLevel() {                       // We finish the level and go to the next one
    exitingLevel = true;
    resetInput();
    stopPlayer();
    game.time.events.add(1200, nextLevel, this);
}



function nextLevel() {                          // We delete the current level
    clearLevel();
    levelToPlay += 1;
    if (levelToPlay > levelsData.length)        // If there are no levels left, it goes to the end screen
        goToEnd();
    else {                                      // We go to the next level
        game.input.enabled = true;
        game.state.start('play');
    }
}

function repitLevel(){                          // We repeat the level
    medievalSound.stop();
    game.state.start('play');
}

function clearLevel() {                         // We delete the HUD, the platforms and the player
    hudGroup.removeAll(true);
    platforms.removeAll(true);
    player.destroy();
}

function goToEnd() {                                    // We go to the end screen
    game.time.events.remove(clock);
    gameMusic.stop();
    resetPlayer();
    game.world.setBounds(0, 0, game.width, game.height);
    game.state.start('end');
}

