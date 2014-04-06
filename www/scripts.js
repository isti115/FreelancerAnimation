"use strict";

//{ system variable declaration

	var width, height;
	var canvas, context;
	var keyDown = new Array();
	
	var startTime, previousTime, currentTime;

//}

//{ user variable declaration

	var stop = false;
	
	var innerOffset;
	
	var sickleCount;
	var sickles = new Array();
	
	var timeStep;
	var moveRatio;
	
	var finished = false;

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
	
		sickleCount = 10;
		
		innerOffset = {x:-5, y:37, rotation:-6, scale:0.7};
		
		for(var i = 0; i < sickleCount; i++)
		{
			sickles.push(new Sickle(Math.random() * width, Math.random() * height, rad(Math.random() * 360), (width / 2), (height / 2), rad(0), "#555555", 1));
		}
		
		for(var i = 0; i < sickleCount; i++)
		{
			sickles.push(new Sickle(Math.random() * width, Math.random() * height, rad(Math.random() * 360), (width / 2), (height / 2), rad(180), "#999999", 1));
		}
		
		for(var i = 0; i < sickleCount; i++)
		{
			sickles.push(new Sickle(Math.random() * width, Math.random() * height, rad(Math.random() * 360), (width / 2) + innerOffset.x, (height / 2) + innerOffset.y, rad(0 + innerOffset.rotation), "#555555", innerOffset.scale));
		}
		
		for(var i = 0; i < sickleCount; i++)
		{
			sickles.push(new Sickle(Math.random() * width, Math.random() * height, rad(Math.random() * 360), (width / 2) - innerOffset.x, (height / 2) - innerOffset.y, rad(180 + innerOffset.rotation), "#999999", innerOffset.scale));
		}
		
		timeStep = 20;
		moveRatio = 250;
	
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

function Sickle(x, y, rotation, x_destination, y_destination, rotation_destination, color, scale)
{
	this.x = x;
	this.y = y;
	this.rotation = rotation;
	
	this.destination = {x:x_destination, y:y_destination, rotation:rotation_destination};
	
	this.scale = scale;
	
	this.draw = function ()
	{
		context.save();
		
		context.strokeStyle = color;
		context.fillStyle = color;
		
		context.translate(this.x, this.y);
		context.rotate(this.rotation);
		
		context.scale(scale, scale);
		
		context.beginPath();
		context.arc(0, 0, 128, -rad(90), rad(75)); //outer arc
		context.stroke();
		
		context.beginPath();
		context.arc(0, 28, 100, -rad(90), rad(75)); //inner arc
		context.stroke();
		
		context.beginPath();
		context.arc(0, -100, 28, rad(90), -rad(90)); //cap arc
		context.stroke();
		
		context.restore();
	}
}

function main()
{
	if (stop)
	{
		return;
	}
	
	currentTime = new Date().getTime();
	
	update(currentTime - previousTime);
	draw();
	
	previousTime = currentTime;
	
	if(currentTime - startTime > 10000)
	{
		//location.reload();
	}
	
	setTimeout(main, timeStep);
}

function update(dt)
{
	dt /= 5;
	
	if(!finished)
	{
		var seemsFinished = true;
		
		for(var i = 0; i < sickles.length; i++)
		{
			sickles[i].x = ((sickles[i].x * moveRatio) + (sickles[i].destination.x) * dt) / (moveRatio + dt);
			sickles[i].y = ((sickles[i].y * moveRatio) + (sickles[i].destination.y) * dt) / (moveRatio + dt);
			sickles[i].rotation = ((sickles[i].rotation * moveRatio) + (sickles[i].destination.rotation) * dt) / (moveRatio + dt);
			
			if	(
				Math.round(sickles[i].x * 10) != sickles[i].destination.x * 10 ||
				Math.round(sickles[i].y * 10) != sickles[i].destination.y * 10 ||
				Math.round(sickles[i].rotation * 10) != Math.round(sickles[i].destination.rotation * 10)
				)
			{
				seemsFinished = false;
			}
			
			else
			{
				sickles[i].x = sickles[i].destination.x;
				sickles[i].y = sickles[i].destination.y;
				sickles[i].rotation = sickles[i].destination.rotation;
			}
		}
		
		finished = seemsFinished;
	}
}

function draw()
{
	context.clearRect(0, 0, width, height);
	
	for(var i = 0; i < sickles.length; i++)
	{
		sickles[i].draw();
	}
	
	if(finished)
	{
		context.textAlign = "center";
		
		context.font = "75px Corbel";
		context.fillStyle = "#cb7435";
		context.fillText("SENSE PROJECTS", width / 2, height * (12 / 15));
		
		stop = true;
	}
}