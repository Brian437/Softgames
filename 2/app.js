const HEIGHT=750;
const WIDTH=1000;
const TEXT=[
	"Sample",
	"Text",
	"Random",
	"Softgames",
	"Cat",
	'Dog',
	"Fire",
	'Thunder',
	"Earth",
	"Water",
	"Games",
	"PixiJS",
	"JavaScript"
];
const IMAGE=[
	"orange",
	"rat",
	"banada",
	"cat",
	"dog",
	"fire",
	"globe",
	"add",
	"smile",
	"thunder"
]
const MIN_FONT_SIZE=10;
const MAX_FONT_SIZE=100;
const MIN_IMAGE_SIZE=25;
const MAX_IMAGE_SIZE=125;
const START_X=5;
const START_Y=5;
const NEW_SPRITE_TIMER=2*1000;
const SPRITE_SPACE_X=5;
const SPRITE_SPACE_Y=5;

PIXI.utils.sayHello();

var renderer=PIXI.autoDetectRenderer(WIDTH,HEIGHT, {
	transparent:false,
	resolution:1
});
renderer.backgroundColor=0xc0c0c0;
document.getElementById('display').appendChild(renderer.view);

var stage=new PIXI.Container();

for(var x=0;x<IMAGE.length;x++)
{
	PIXI.loader.add(IMAGE[x],"images/"+IMAGE[x]+".png");
}

PIXI.loader
	// .add("rat","images/orange.png")
	.load(setup);

// var rat;
var newSpriteTimer=setInterval(newSpriteTimerFunction,NEW_SPRITE_TIMER);
var newX=START_X;
var newY=START_Y;
var lowY=newY;
var spriteList=[];

function newSpriteTimerFunction()
{
	console.log("Generating sprite");
	var type=Math.floor(Math.random()*2);
	var sprite;
	if(type==0)//Text
	{
		var fontSize=Math.floor(Math.random()*(MAX_FONT_SIZE-MIN_FONT_SIZE)+MIN_FONT_SIZE);
		var style = {
		    font : 'bold italic '+fontSize+'px Arial',
		    fill : '#F7EDCA',
		    stroke : '#4a1850',
		    strokeThickness : 5,
		    dropShadow : true,
		    dropShadowColor : '#000000',
		    dropShadowAngle : Math.PI / 6,
		    dropShadowDistance : 6,
		    wordWrap : true,
		    wordWrapWidth : WIDTH,
		};
		text=TEXT[Math.floor(Math.random()*TEXT.length)];
		sprite=new PIXI.Text(text,style);			
	}
	else//Image
	{
		//random image
		var image=Math.floor(Math.random()*IMAGE.length);
		var length=Math.floor(Math.random()*(MAX_IMAGE_SIZE- MIN_IMAGE_SIZE)+MIN_IMAGE_SIZE);
		sprite=new PIXI.Sprite(
			PIXI.loader.resources[IMAGE[image]].texture
		);
		sprite.height=length;
		sprite.width=length;
	}

	if(sprite!=null)
	{
		sprite.x=newX;
		sprite.y=newY;
		stage.addChild(sprite);
		spriteList.push(sprite);
		lowY=Math.max(lowY,newY+sprite.height);
		newX+=sprite.width+SPRITE_SPACE_X;
	}
	if(sprite!=null && (sprite.x+sprite.width)>WIDTH)
	{
		newY=lowY+SPRITE_SPACE_Y;
		sprite.x=START_X;
		sprite.y=newY;
		newX=START_X+sprite.width+SPRITE_SPACE_X;
		lowY=newY+sprite.height;
	}
}

function setup(){
	stage.interactive=true;
	animationLoop();
}

function animationLoop()
{
	requestAnimationFrame(animationLoop);
	renderer.render(stage);
}