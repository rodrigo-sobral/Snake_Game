"use strict";

(function() {
	window.addEventListener("load", main)
}());

const DEF_SQR_SZ=25

function main() {
	var canvas = document.getElementById("myCanvas")
	var ctx = canvas.getContext("2d")
	
	let player= new Snake(50, 50,  DEF_SQR_SZ)
	let apple= generateApple(ctx.canvas.width, ctx.canvas.height)

	animLoop(ctx, player, apple)
}

function animLoop(ctx, player, apple) {
	var al = function() { animLoop(ctx, player, apple) }
	window.requestAnimationFrame(al)
	
	renderGame(ctx, player, apple)
}

function detectKeyboard(player) {
	function keyHandler(ev) { player.detectMovement(ev.code) }
	window.addEventListener("keydown", keyHandler)
}


function renderGame(ctx, player, apple) {
	let ch= ctx.canvas.height
	let cw= ctx.canvas.width

	//	MOVEMENTS
	detectKeyboard(player)
	player.moving(cw, ch)
	
	//	APPLE GENERATION
	if (apple.eaten==true) {
		apple.pos.x= Math.floor(Math.random()*(cw-DEF_SQR_SZ))
		apple.pos.y= Math.floor(Math.random()*(ch-DEF_SQR_SZ))
		apple.eaten=false
		player.grow()
	}

	//	COLLISIONS
	if (apple.collidesWith(player)==true) apple.eaten=true

	//	DRAWING
	ctx.clearRect(0, 0, cw, ch)	
	player.draw(ctx)
	apple.draw(ctx)
}


function generateApple(cw, ch) {
	return new Apple(Math.floor(Math.random()*(cw-DEF_SQR_SZ)), Math.floor(Math.random()*(ch-DEF_SQR_SZ)), DEF_SQR_SZ)
}

