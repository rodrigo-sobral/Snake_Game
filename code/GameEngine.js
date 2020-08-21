"use strict";

(function() {
	window.addEventListener("load", main)
}());

function main() {
	let canvas = document.getElementById("myCanvas")
	let ctx = canvas.getContext("2d")
	
	let play= new Play(ctx.canvas.width, ctx.canvas.height)

	animLoop(ctx, play)
}

function animLoop(ctx, play) {
	var al = function() { animLoop(ctx, play) }
	let reqID = window.requestAnimationFrame(al)
	
	renderGame(ctx, reqID, play)
}

function detectKeyboard(reqID, play) {
	function keyHandler(ev) { 
		if (ev.code=="Escape") {
			window.cancelAnimationFrame(reqID)
			location.replace("../index.html")
		}
		else play.snake[0].detectMovement(ev.type, ev.code)
	}
	window.addEventListener("keydown", keyHandler)
	window.addEventListener("keyup", keyHandler)
}

function renderGame(ctx, reqID, play) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width
	play.updatePointsBox()

	//	MOVEMENTS
	detectKeyboard(reqID, play)
	snakeMovement(play.snake, cw, ch)

	//	COLLISIONS
	//	With Apple
	if (!play.special_apple_on  && play.apple.collidesWith(play.snake[0])) play.apple.eaten=true
	else if (play.special_apple_on && play.special_apple.collidesWith(play.snake[0])) play.special_apple.eaten=true
	//	With Snake
	for (let i=2; i < play.snake.length; i++) {
		if (play.snake[0].collidesWith(play.snake[i])) play.dead=true
	}
	
	//	APPLE EATEN/GENERATION
	play.eatApple(cw, ch, ctx)

	//	DRAWING
	ctx.clearRect(0, 0, cw, ch)	
	if (play.special_apple_on) play.special_apple.draw(ctx)
	else play.apple.draw(ctx)
	for (let i = 0; i < play.snake.length; i++) play.snake[i].draw(ctx)

	saveData(play)
}

function snakeMovement(snake, cw, ch) {
	snake[0].moving(cw, ch)
	for (let i = 1; i < snake.length; i++) {
		snake[i].speed=snake[i-1].speed
		snake[i].moving(cw, ch)
		if (snake[i-1].status.goingRight && !snake[i].status.goingRight) changeDirect("KeyD", snake[i], snake[i-1])
		else if (snake[i-1].status.goingLeft && !snake[i].status.goingLeft) changeDirect("KeyA", snake[i], snake[i-1])
		else if (snake[i-1].status.goingUp && !snake[i].status.goingUp) changeDirect("KeyW", snake[i], snake[i-1])
		else if (snake[i-1].status.goingDown && !snake[i].status.goingDown) changeDirect("KeyS", snake[i], snake[i-1])
	}
}
function changeDirect(to, snakebehind, snakeinfront) {
	if ((to=="KeyD" || to=="KeyA") && ((snakebehind.status.goingUp && snakebehind.pos.y<=snakeinfront.pos.y) || (snakebehind.status.goingDown && snakebehind.pos.y>=snakeinfront.pos.y))) {
		snakebehind.pos.y=snakeinfront.pos.y
		if (to=="KeyD") snakebehind.pos.x=snakeinfront.pos.x-snakebehind.size
		else snakebehind.pos.x=snakeinfront.pos.x+snakebehind.size
		snakebehind.detectMovement("keydown", to)
	} else if ((to=="KeyS" || to=="KeyW") && ((snakebehind.status.goingLeft && snakebehind.pos.x<=snakeinfront.pos.x) || (snakebehind.status.goingRight && snakebehind.pos.x>=snakeinfront.pos.x))) {
		snakebehind.pos.x=snakeinfront.pos.x 
		if (to=="KeyS") snakebehind.pos.y=snakeinfront.pos.y-snakebehind.size
		else snakebehind.pos.y=snakeinfront.pos.y+snakebehind.size
		snakebehind.detectMovement("keydown", to)
	} 
}

function saveData(play) {
	let info_player = JSON.parse(localStorage.getItem(localStorage.getItem("__playing__")))
	info_player["apples_eaten"]= play.apples_eaten
	info_player["special_apples_eaten"]= play.special_apples_eaten
	if (info_player["points_record"] < play.points_got) info_player["points_record"]= play.points_got
	const actual= new Date()
	info_player["record_date"]= actual.getDate().toString() + "-" + (actual.getMonth()+1).toString() + "-" + actual.getFullYear().toString()
	localStorage.setItem(localStorage.getItem("__playing__"), JSON.stringify(info_player))
}