"use strict";

//{ system variable declaration

	var width, height;
	var canvas, context;
	var keyDown = new Array();
	
	var startTime, previousTime, currentTime;

//}

//{ user variable declaration

	var moveRatio;
	
	var sickles = new Array();

//}

function init()
{
	//{ system variable and event initialization
	
		window.addEventListener("keydown", keydown, false);
		window.addEventListener("keyup", keyup, false);
		
		canvas = document.getElementById("canvas");
		context = canvas.getContext("2d");
		
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		
		width = canvas.width;
		height = canvas.height;
		
		startTime = new Date().getTime();
		previousTime = startTime;
		currentTime = startTime;
	
	//}
	
	//{ user variable initialization
	
		for(var i = 0; i < 5; i++)
		{
			sickles.push(new Sickle(Math.random() * width, Math.random() * height, rad(0)));
		}
		
		for(var i = 0; i < 5; i++)
		{
			sickles.push(new Sickle(Math.random() * width, Math.random() * height, rad(180)));
		}
		
		moveRatio = 100;
	
	//}
	
	main();
}

//{ key functions

	function keydown(e)
	{
		keyDown[e.keyCode] = true;
	}

	function keyup(e)
	{
		keyDown[e.keyCode] = false;
	}

//}

function rad(deg)
{
	return (Math.PI / 180) * deg;
}

function Sickle(x, y, rotation)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	
	this.draw = function ()
	{
		context.save();
		
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		
		context.beginPath();
		context.arc(0, 0, 128, -rad(90), rad(90));
		context.stroke();
		
		context.beginPath();
		context.arc(0, 28, 100, -rad(90), rad(90));
		context.stroke();
		
		context.beginPath();
		context.arc(0, -100, 28, rad(90), -rad(90));
		context.stroke();
		
		context.restore();
	}
}

function main()
{
	currentTime = new Date().getTime();
	
	control();
	update(currentTime - previousTime);
	draw();
	
	previousTime = currentTime;
	
	if(currentTime - startTime > 5000)
	{
		location.reload();
	}
	
	setTimeout(main, 20);
}

function control()
{
	
}

function update(dt)
{
	dt /= 5;
	
	for(var i = 0; i < sickles.length; i++)
	{
		sickles[i].x = ((sickles[i].x * moveRatio) + ((width / 2)) * dt) / (moveRatio + dt);
		sickles[i].y = ((sickles[i].y * moveRatio) + ((height / 2)) * dt) / (moveRatio + dt);
	}
}

function draw()
{
	context.clearRect(0, 0, width, height);
	
	for(var i = 0; i < sickles.length; i++)
	{
		sickles[i].draw();
	}
}