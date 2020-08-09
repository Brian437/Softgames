PIXI.utils.sayHello();
const WIDTH=440;
const HEIGHT=360;
const MENU_START_X=30;
const MENU_START_Y=25;
const MENU_DISTANCE=120;
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

	// var menu1;
	var menu=[];
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
	    wordWrapWidth : WIDTH-MENU_START_X
	};
	for(var x=0;x<MENU_TEXT.length;x++)
	{
		menu[x] = new PIXI.Text(MENU_TEXT[x],style);
		menu[x].x = MENU_START_X;
		menu[x].y = MENU_START_Y+x*MENU_DISTANCE;
		menu[x].interactive=true;
		menu[x].url="/"+(x+1);
		menu[x].click=function(e){
			// alert(this);
			// console.log(this);
			// console.log(this.url);
			window.open(this.url,'_self');
		}
		stage.addChild(menu[x]);
	}
	function menuClick(index)
	{
		console.log(this);
		// alert('test '+index);
	}
	// menu[0] = new PIXI.Text(MENU_TEXT[0],style);
	// menu[0].x = 30;
	// menu[0].y = 5;
	// stage.addChild(menu[0]);
	// menu[1] = new PIXI.Text('Project 2',style);
	// menu[1].x = 30;
	// menu[1].y = 105;
	// stage.addChild(menu[1]);
	// menu[2] = new PIXI.Text('Flame Particles',style);
	// menu[2].x = 30;
	// menu[2].y = 205;
	// stage.addChild(menu[2]);



	// rat = new PIXI.Sprite(
	// 	PIXI.loader.resources["rat"].texture
	// );

	// rat.interactive=true;
	// rat.scale.set(0.30,0.30);
	// rat.x=renderer.width/2;
	// rat.y=renderer.height/2;
	// rat.anchor.set(0.5,0.5);
	// // rat.pivot.set(200,0);

	// rat.click = function(){
	// 	rat.scale.x -=0.05;
	// 	rat.scale.y -=0.05;
	// };


	// stage.addChild(rat);

	animationLoop();
	
}

function animationLoop()
{
	requestAnimationFrame(animationLoop);

	

	// rat.rotation+=0.01;
	

	renderer.render(stage);
}