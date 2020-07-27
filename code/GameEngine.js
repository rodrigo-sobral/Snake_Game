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
		player[0].detectMovement(ev.type, ev.code)
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
	snakeMovement(player, cw, ch)

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
		player.push(new Snake(0, last_snake.pos.y, last_snake.size))
		player[player.length-1].pos.x= last_snake.pos.x-last_snake.size
	} else if (player[0].status.goingLeft) {
		player.push(new Snake(0, last_snake.pos.y, last_snake.size))
		player[player.length-1].pos.x= last_snake.pos.x+last_snake.size
	} else if (player[0].status.goingUp) {
		player.push(new Snake(last_snake.pos.x, 0, last_snake.size))
		player[player.length-1].pos.y= last_snake.pos.y+last_snake.size
	} else if (player[0].status.goingDown) {
		player.push(new Snake(last_snake.pos.x, 0, last_snake.size))
		player[player.length-1].pos.y= last_snake.pos.y-last_snake.size
	}  Object.assign(player[player.length-1].status, last_snake.status)
	return player
}

function snakeMovement(player, cw, ch) {
	player[0].moving(cw, ch)
	for (let i = 1; i < player.length; i++) {
		player[i].speed=player[i-1].speed
		player[i].moving(cw, ch)
		if (player[i-1].status.goingRight && !player[i].status.goingRight) changeDirect("KeyD", player[i], player[i-1])
		else if (player[i-1].status.goingLeft && !player[i].status.goingLeft) changeDirect("KeyA", player[i], player[i-1])
		else if (player[i-1].status.goingUp && !player[i].status.goingUp) changeDirect("KeyW", player[i], player[i-1])
		else if (player[i-1].status.goingDown && !player[i].status.goingDown) changeDirect("KeyS", player[i], player[i-1])
	}
}

function changeDirect(to, playerbehind, playerinfront) {
	if ((to=="KeyD" || to=="KeyA") && ((playerbehind.status.goingUp && playerbehind.pos.y<=playerinfront.pos.y) || (playerbehind.status.goingDown && playerbehind.pos.y>=playerinfront.pos.y))) {
		playerbehind.pos.y=playerinfront.pos.y
		if (to=="KeyD") playerbehind.pos.x=playerinfront.pos.x-playerbehind.size
		else playerbehind.pos.x=playerinfront.pos.x+playerbehind.size
		playerbehind.detectMovement("keydown", to)
	} else if (to=="KeyS" || to=="KeyW" && ((playerbehind.status.goingLeft && playerbehind.pos.x<=playerinfront.pos.x) || (playerbehind.status.goingRight && playerbehind.pos.x>=playerinfront.pos.x))) {
		playerbehind.pos.x=playerinfront.pos.x 
		if (to=="KeyS") 
			playerbehind.pos.y=playerinfront.pos.y-playerbehind.size
		else playerbehind.pos.y=playerinfront.pos.y+playerbehind.size
		playerbehind.detectMovement("keydown", to)
	} 
}