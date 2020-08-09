PIXI.utils.sayHello();

var renderer=PIXI.autoDetectRenderer(512,512, {
	transparent:true,
	resolution:1
});
document.getElementById('display').appendChild(renderer.view);

var stage=new PIXI.Container();

PIXI.loader
	.add("rat","images/orange.png")
	.load(setup);

var rat;

function setup(){
	stage.interactive=true;


	rat = new PIXI.Sprite(
		PIXI.loader.resources["rat"].texture
	);

	rat.interactive=true;
	rat.scale.set(0.30,0.30);
	rat.x=renderer.width/2;
	rat.y=renderer.height/2;
	rat.anchor.set(0.5,0.5);

	rat.click = function(){
		rat.scale.x -=0.05;
		rat.scale.y -=0.05;
	};


	stage.addChild(rat);

	animationLoop();
	
}

function animationLoop()
{
	requestAnimationFrame(animationLoop);

	

	rat.rotation+=0.01;
	

	renderer.render(stage);
}