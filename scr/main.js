//flags
let gameState;
let textState;
let score;
let level;
let soba_i;
let rock_i;
let powerUp;
let maxFlowin;
let angle;
let keyFlag;
let alpha;

//images
let obj;
let gnd;
let negisoba;
let rock;
let hogen;
let sainokami;
let happyImg;
let makingImg;
let trueImg;
let strikeImg;
let badImg;
let gameoverImg;

//timer
let animationTimer;
let objspeed;

//text
let textx;
let texty;

//objects
let nowImg;
let titanx;
let titany;
let nowImgy;
let nowJumpy;
let nowTitany;
let obstacle;
let nowObs;

//Flowing items x coordenate
let soba_arr   = [800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 1000, 800, 800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 1000, 800];
let rock_arr   = [1000, 900, 1000, 1300, 1500, 1000, 1400, 1200, 1000, 1300, 1000, 1400, 1200, 1000, 1300, 100, 1000, 900, 1000, 1300, 1500, 1000, 1400, 1200, 1000, 1300, 1000, 1400, 1200, 1000, 1300, 1000, ];
let s_titan = {
    x     : 130,
    y     : 290,
    jumpy : 140,
    img   : 0,
    imgx  : 120,
    imgy  : 130,
    score : 80,
    speed : 10
};

let m_titan = {
    x     : 50,
    y     : 130,
    jumpy : -20,
    img   : 0,
    imgx  : 250,
    imgy  : 300,
    score : 180,
    speed : 15
};

let l_titan = {
    x     : 0,
    y     : -10,
    jumpy : -160,
    img   : 0,
    imgx  : 350,
    imgy  : 430,
    score : 300,
    speed : 20
};

let soba_para = {
    y  : 290,
    vx : 10,
    vy : 10,
    };

let rock_para = {
    x  : 800,
    y  : 320,
    vx : 10,
    vy : 10
};

// loading images
function preload(){
    obj         = loadImage('../image/objects.png');
    gnd         = loadImage('../image/ground.png');
    hougen      = loadImage('../image/hougen.png');
    sainokami   = loadImage('../image/sainokami.png');
    happyImg    = loadImage('../image/happyend.png');
    makingImg   = loadImage('../image/making.png');
    trueImg     = loadImage('../image/trueend.png');
    strikeImg   = loadImage('../image/strike.png');
    badImg      = loadImage('../image/badend.png');
    gameoverImg = loadImage('../image/gameover.png');
    titanImg    = loadImage('../image/daitanbou.png');
    mountImg    = loadImage('../image/mountain.png');
}

//setup
function setup(){
    let canvas = createCanvas(800, 500);
    canvas.parent('canvas');

    //images
    obj.loadPixels();
    gnd.loadPixels();
    titanImg.loadPixels();
    negisoba    = obj.get(30, 10, 130, 130);
    rock        = obj.get(240, 30, 130, 110);
    s_titan.img = obj.get(10, 370, s_titan.imgx, s_titan.imgy);
    m_titan.img = obj.get(160, 180, m_titan.imgx, m_titan.imgy);
    l_titan.img = obj.get(430, 40, l_titan.imgx, l_titan.imgy);
    daitanbou1  = titanImg.get(0, 0, 450, 500);
    daitanbou2  = titanImg.get(500, 0, 300, 500);

    //titans state
    nowImg     = s_titan.img;
    titanx     = s_titan.x;
    titany     = s_titan.y;
    nowImgy    = 0;
    powerUp    = true;
    nowJumpy   = s_titan.jumpy;
    nowTitany  = titany;

    //objects
    objectsNum = 30;
    soba_i     = 0;
    rock_i     = 0;
    objspeed   = s_titan.speed;
    obstacle   = [rock, sainokami, hougen];
    nowObs     = rock;

    //details
    gameState  = 6;
    score      = 0;
    keyFlag    = false;

    //text
    textx      = 430;
    texty      = 200;
    textState  = 0;

    //animation
    animationTimer = 0;
    angle      = 0;
    alpha      = 0;
}


//main
function draw(){
    if(gameState == 1){
	mainGame();
    }
    if(gameState == 2){
	gameOver();
    }
    if(gameState == 3){
	happyEnd();
    }
    if(gameState == 4){
	trueEnd();
    }
    if(gameState == 5){
	badEnd();
    }
    if(gameState == 6){
	openingAnimation();
    }
}

//functions
function initStatus(){
    nowImg     = s_titan.img;
    titanx     = s_titan.x;
    titany     = s_titan.y;
    nowJumpy   = s_titan.jumpy;
    nowTitany  = titany;
    objspeed   = s_titan.speed;
    nowImgy    = 0;
    powerUp    = true;
    objectsNum = 30;
    soba_arr   = [800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 1000, 800, 800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 800, 900, 1000, 800, 1200, 1000, 800];
    rock_arr   = [1000, 900, 1000, 1300, 1500, 1000, 1400, 1200, 1000, 1300, 1000, 1400, 1200, 1000, 1300, 100, 1000, 900, 1000, 1300, 1500, 1000, 1400, 1200, 1000, 1300, 1000, 1400, 1200, 1000, 1300, 1000, ];
    soba_i     = 0;
    rock_i     = 0;
    score      = 0;
    animationTimer = 0;
    angle      = 0;
    keyFlag    = false;
}

function setData(img, imgy, x, y, jumpy, speed){
    nowImg   = img;
    nowImgy  = imgy;
    titanx   = x;
    titany   = y;
    powerUp  = false;
    nowJumpy = jumpy;
    nowTitany = titany;
    objspeed = speed;
    animationTimer = 0;
}

function imgShow(flag){
    background(100, 150, 255);
    image(gnd, animationTimer, 0);
    image(gnd, 800 + animationTimer, 0)
    image(negisoba, soba_arr[soba_i], soba_para.y);
    image(nowObs, rock_arr[rock_i], rock_para.y);
    translate(titanx, titany);
    if(flag == "rotate"){
	rotate(radians(angle));
	angle += 4;
    }
    else{
	animationTimer -= 10;
	if(animationTimer < -800) animationTimer = 0;
    }
    image(nowImg, 0, 0);
}

function endRun(state){
    if(titanx > 900){
	animationTimer = 0;
	gameState = state;
    }
    else{
	rock_arr[rock_i] = width;
	soba_arr[soba_i] = width;
	titanx += 10;
	keyFlag = false;
    }
}

function makingLine(){
    let x = 10;
    let y = 20;
    stroke(1);
    strokeWeight(2);
    for(let i = -300; i <= 1050; i+= 150){
	line(i, 0, 100+i/1.4+random(x, y), 100+random(x, y));
	line(i, 500, 100+i/1.4+random(x, y), 400+random(x, y));
    }
    
    line(0, 250, 20+random(10, 20), 250+random(10, 20));
    line(800, 250, 780+random(10, 20), 250+random(10, 20));
}

function controlNowTitan(levelupScore, nextImg, nextImgy, nextx, nexty, nextJumpy, nextspeed){
    if(score == levelupScore && powerUp){
	setData(nextImg, nextImgy, nextx, nexty, nextJumpy, nextspeed);
    }
}

function endingAnimation(endingImg, insertImg, happyEndFlag){
    if(animationTimer >= 200){
	image(endingImg, 0, 0);
	animationTimer = 200;
	keyFlag = true;
    }
    else if(animationTimer >= 100){
	if(happyEndFlag){
	    noStroke();
	    fill(255, 255, 255, alpha);
	    rect(0, 0, width, height);
	    alpha += 1;
	}
	else{
	    image(insertImg, 0, 0);
	    makingLine();
	}
    }
    else{
	image(mountImg, 0, 0);
	makingLine();
    }
    animationTimer++;
}

//1
function mainGame(){
    imgShow("nomal");

    //titan size controll
    //small
    if(score <= s_titan.score && nowImg == s_titan.img){
	controlNowTitan(s_titan.score, m_titan.img, m_titan.imgy, m_titan.x, m_titan.y, m_titan.jumpy, m_titan.speed);
	if(soba_i >= objectsNum) endRun(5);
    }
    
    //mideum 
    else if(score <= m_titan.score && nowImg == m_titan.img){
	controlNowTitan(m_titan.score, l_titan.img, l_titan.imgy, l_titan.x, l_titan.y, l_titan.jumpy, l_titan.speed);
	if(score < m_titan.score) powerUp = true;
	if(soba_i >= objectsNum) endRun(4);
    }

    //large
    else{
	if(soba_i >= objectsNum) endRun(3);
    }
  
    //increase point
    if(-10 <= soba_arr[soba_i] && soba_arr[soba_i] <= 200 && soba_para.y <= (titany + nowImgy)){
    	score += 10;
    	console.log(score);
    	soba_i++;
    }

    //moving objects
    soba_arr[soba_i] -= objspeed;
    rock_arr[rock_i] -= objspeed;
    if(soba_arr[soba_i] < -30){
	soba_i++;
    }
    if(rock_arr[rock_i] < -30){
	rock_i++;
	nowObs = random(obstacle);
    }

    //gameOver
    if(rock_arr[rock_i] == 200 && !mouseIsPressed){
	gameState = 2;
    }
}

//2
function gameOver(){
    if(titany <= -510){
	keyFlag = true;
	image(gameoverImg, 0, 0);
	text("クリックでゲームに戻る", textx, texty+100);
	titany = -510;
    }
    else{
	keyFlag = false;
	titanx += 20;
	titany -= 10;
	imgShow("rotate");
    }
}

//3
function happyEnd(){
    endingAnimation(happyImg, makingImg, 1);
}

//4
function trueEnd(){
    endingAnimation(trueImg, makingImg, 0);
}

//5
function badEnd(){
    endingAnimation(badImg, strikeImg, 0);
}

//6
function openingAnimation(){
    if(textState == 0){
	background(100, 150, 255);
	
	noStroke();
	ellipse(220 - animationTimer, 100, 200, 100);
	ellipse(450 - animationTimer, 300, 150, 100);
	ellipse(550 - animationTimer, 340, 250, 150);
	ellipse(width - animationTimer, 250, 200, 100);

	textSize(25);
	text("むかーしむかしあるところに...", textx, texty);

	animationTimer += 0.5;
	if(animationTimer > 900) animationTimer = -700;
    }

    if(textState == 1){
	background(255, 255, 255);
	
	if(0 <= animationTimer && animationTimer < 30){
	    image(daitanbou1, 0, 0);
	    animationTimer += 10;
	}
	else if(30 <= animationTimer && animationTimer <= 60){
	    image(daitanbou2, 0, 0);
	    animationTimer += 10;

	    if(animationTimer == 60) animationTimer = 0;
	}

	else animationTimer = 0;

	text("ダイタンボウという\n巨人がいました", textx, texty);
    }

    if(textState == 2){
	image(mountImg, 0, 0);
	strokeWeight(1);
	text("大変だ！目の前に大きな山が！\n今のダイタンボウでは山に\n打ち勝てない！", textx, texty);
	makingLine();	
    }

    if(textState == 3){
	background(255, 255, 255);
	strokeWeight(1);
	text("あ！あれはねぎそばだ！\nねぎそばを食べて力をつけよう！", textx, texty);
	image(negisoba, 300, 200 + animationTimer);
	makingLine();
	animationTimer += 2;
	if(animationTimer > 70) animationTimer = 0;
    }

    if(textState == 4){
	animationTimer = 0;
	gameState = 1;
    }
}

function mousePressed() {
    if(gameState == 1) {
	titany = nowJumpy;
	keyFlag = true;
    }
    else if((gameState == 2 || gameState == 4 || gameState == 5) && keyFlag){
	initStatus();
	gameState = 1;
    }
    else if(gameState == 6){
	textState++;
    }
}

function mouseReleased() {
    if(gameState == 1 && keyFlag){
	titany = nowTitany;
	keyFlag = false;
    }
}
