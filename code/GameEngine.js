"use strict";

(function() {
	window.addEventListener("load", main)
}());

const DEF_SQR_SZ=25

function main() {
	var canvas = document.getElementById("myCanvas")
	var ctx = canvas.getContext("2d")
	
	let player= [new Snake(50, 50,  DEF_SQR_SZ)]
	let apple= generateApple(ctx.canvas.width, ctx.canvas.height)

	animLoop(ctx, player, apple)
}

function animLoop(ctx, player, apple) {
	var al = function() { animLoop(ctx, player, apple) }
	window.requestAnimationFrame(al)
	
	renderGame(ctx, player, apple)
}

function detectKeyboard(player) {
	function keyHandler(ev) { 
		for (let i = 0; i < player.length; i++) player[i].detectMovement(ev.type, ev.code)
	}
	window.addEventListener("keydown", keyHandler)
	window.addEventListener("keyup", keyHandler)
}


function renderGame(ctx, player, apple) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width

	//	DRAWING
	ctx.clearRect(0, 0, cw, ch)	
	apple.draw(ctx)
	for (let i = 0; i < player.length; i++) player[i].draw(ctx)

	//	MOVEMENTS
	detectKeyboard(player)
	for (let i = 0; i < player.length; i++) {
		if (player.length>1) 
			console.log(player)
		player[i].moving(cw, ch)
	}
	//	COLLISIONS
	if (apple.collidesWith(player[0])==true) apple.eaten=true

	//	APPLE EATEN/GENERATION
	if (apple.eaten==true) {
		apple.pos.x= Math.floor(Math.random()*(cw-DEF_SQR_SZ))
		apple.pos.y= Math.floor(Math.random()*(ch-DEF_SQR_SZ))
		apple.eaten=false
		player=growSnake(player)
	}	
}


function generateApple(cw, ch) {
	return new Apple(Math.floor(Math.random()*(cw-DEF_SQR_SZ)), Math.floor(Math.random()*(ch-DEF_SQR_SZ)), DEF_SQR_SZ)
}

function growSnake(player) {
	const last_snake= player[player.length-1]
	if (player[0].status.goingRight) {
		player.push(last_snake)
		player[player.length-1].pos.x= last_snake.pos.x-last_snake.size
	} else if (player[0].status.goingLeft) {
		player.push(last_snake)
		player[player.length-1].pos.x= last_snake.pos.x+last_snake.size
	} else if (player[0].status.goingUp) {
		player.push(last_snake)
		player[player.length-1].pos.y= last_snake.pos.y+last_snake.size
	} else if (player[0].status.goingDown) {
		player.push(last_snake)
		player[player.length-1].pos.y= last_snake.pos.y-last_snake.size
	} return player
}
