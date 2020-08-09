/*
	Created by Brian Chaves
	Created on August 07, 2020
	Updated on August 09, 2020
*/
const START_X=25;
const START_Y=50;
const STAGE_HEIGHT=750;
const STAGE_WIDTH=1000;
const CARD_SIZE=200;
const END_X=STAGE_WIDTH-CARD_SIZE-25;
const END_Y=STAGE_HEIGHT-CARD_SIZE-25;
const UNIQE_IMAGE_COUNT=73;
const CARD_COUNT=144;
const MILLISECONDS_PER_SECONDS=1000;
const CARD_PATH_TIME=MILLISECONDS_PER_SECONDS*2;
const NEXT_CARD_TIME=MILLISECONDS_PER_SECONDS*1;
const FRAME_PER_SECONDS=60;
const CARD_SPACE=0.25;
const START_DELAY=MILLISECONDS_PER_SECONDS*2;

var renderer=PIXI.autoDetectRenderer(STAGE_WIDTH,STAGE_HEIGHT, {
	transparent:false,
	resolution:1
});
renderer.backgroundColor=0xc0c0c0;
document.getElementById('display').appendChild(renderer.view);


var stage=new PIXI.Container();


for(var x=0;x<UNIQE_IMAGE_COUNT;x++)
{
	PIXI.loader.add("card"+x,"images/cards/"+x+".jpg");
}
PIXI.loader
	.load(setup);

var rat;
var richText;
var topStack;
var bottomStack;
var cards=[];
displayStatus();
var framesPerSecond=0;
var fpsCount=0;
var fpsTimer=setInterval(fpsTimerFunction,MILLISECONDS_PER_SECONDS);
var startTime=new Date();
var currentTime=startTime;
var timeElapsed=0;

function setup(){
	stage.interactive=true;

	for(var x=0;x<CARD_COUNT;x++)
	{
		cardImage=Math.floor(Math.random()*UNIQE_IMAGE_COUNT);
		var card=new PIXI.Sprite(
			PIXI.loader.resources["card"+cardImage].texture
		);
		card.startX=START_X+x*CARD_SPACE;
		card.startY=START_Y+x*CARD_SPACE;
		card.x=card.startX;
		card.y=card.startY;
		card.targetX=END_X-(CARD_COUNT-x)*CARD_SPACE;
		card.targetY=END_Y-(CARD_COUNT-x)*CARD_SPACE;
		card.height=200;
		card.width=200;
		card.startMove=(CARD_COUNT-x-1)*NEXT_CARD_TIME
			+START_DELAY;
		card.endMove=card.startMove+(CARD_PATH_TIME);
		card.faceFront=false;
		cards.push(card);
		stage.addChild(card);
	}
	animationLoop();
	
}
function fpsTimerFunction()
{
	framesPerSecond=fpsCount;
	fpsCount=0;
	richText.text=framesPerSecond+"FPS";
}

function animationLoop()
{
	requestAnimationFrame(animationLoop);
	fpsCount++;
	currentTime=new Date();
	timeElapsed=currentTime-startTime;

	for(var x=0;x<CARD_COUNT;x++)
	{
		card=cards[x];

		if(timeElapsed<card.startMove)
		{
			card.x=card.startX;
			card.y=card.startY;
		}
		else if(timeElapsed>card.endMove)
		{
			card.x=card.targetX;
			card.y=card.targetY;
		}
		else
		{
			if(!card.faceFront)
			{
				card.faceFront=true;
				stage.addChild(card);
			}
			card.x=
				(
					(timeElapsed-card.startMove)/
					(CARD_PATH_TIME) *
					(card.targetX-card.startX)
				)+card.startX;
			card.y=
				(
					(timeElapsed-card.startMove)/
					(CARD_PATH_TIME) *
					(card.targetY-card.startY)
				)+card.startY;
		}
	}
	renderer.render(stage);
}
function displayStatus()
{
	var style = {
	    font : 'bold italic 36px Arial',
	    fill : '#F7EDCA',
	    stroke : '#4a1850',
	    strokeThickness : 5,
	    dropShadow : true,
	    dropShadowColor : '#000000',
	    dropShadowAngle : Math.PI / 6,
	    dropShadowDistance : 6,
	    wordWrap : true,
	    wordWrapWidth : 440
	};
	richText = new PIXI.Text('0FPS',style);
	richText.x = 30;
	richText.y = 5;
	stage.addChild(richText);
}