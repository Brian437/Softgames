PIXI.utils.sayHello();
const WIDTH=750;
const HEIGHT=500;
const MENU_START_X=30;
const MENU_START_Y=25;
const MENU_DISTANCE=150;
const MENU_TEXT=['Moving Cards','Random Text & image','Flame Particles'];

var renderer=PIXI.autoDetectRenderer(WIDTH,HEIGHT, {
	transparent:false,
	resolution:1
});
renderer.backgroundColor=0xc0c0c0;
document.getElementById('display').appendChild(renderer.view);

var stage=new PIXI.Container();

PIXI.loader
	.add("rat","images/orange.png")
	.load(setup);

var rat;

function setup(){
	stage.interactive=true;
	var menu=[];
	var style = {
	    font : 'bold italic 48px Arial',
	    fill : '#F7EDCA',
	    stroke : '#4a1850',
	    strokeThickness : 5,
	    dropShadow : true,
	    dropShadowColor : '#000000',
	    dropShadowAngle : Math.PI / 6,
	    dropShadowDistance : 6,
	    wordWrap : true,
	    wordWrapWidth : WIDTH-MENU_START_X
	};
	for(var x=0;x<MENU_TEXT.length;x++)
	{
		menu[x] = new PIXI.Text(MENU_TEXT[x],style);
		menu[x].x = MENU_START_X;
		menu[x].y = MENU_START_Y+x*MENU_DISTANCE;
		menu[x].interactive=true;
		menu[x].url="/"+(x+1);
		menu[x].pointertap=function(e){
			window.open(this.url,'_self');
		}
		stage.addChild(menu[x]);
	}
	function menuClick(index)
	{
		console.log(this);
	}
	animationLoop();
	
}

function animationLoop()
{
	requestAnimationFrame(animationLoop);
	renderer.render(stage);
}