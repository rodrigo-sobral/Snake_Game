"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let playBtn = document.getElementById("playBtn");
    let optionsBtn = document.getElementById("optionsBtn");
    let helpBtn = document.getElementById("helpBtn");
    let creditsBtn = document.getElementById("creditsBtn");
    let closeBtn = document.getElementById("closeBtn");

    playBtn.addEventListener("mouseup", menuPlay);
    playBtn.addEventListener("mouseenter", playSound);
    optionsBtn.addEventListener("mouseup", menuOptions);
    optionsBtn.addEventListener("mouseenter", playSound);
    helpBtn.addEventListener("mouseup", menuHelp);
    helpBtn.addEventListener("mouseenter", playSound);
    creditsBtn.addEventListener("mouseup", menuCredits);
    creditsBtn.addEventListener("mouseenter", playSound);
    closeBtn.addEventListener("mouseup", menuClose);
    closeBtn.addEventListener("mouseenter", playSound);
}

function menuPlay() { location.replace("html/Careers.html") }

function menuOptions() { location.replace("html/Ranking.html") }

function menuHelp() { location.replace("html/Help.html") }

function menuCredits() { location.replace("html/Credits.html") }

function menuClose() { window.close(); }

function playSound() {
    let sound = new Audio("resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}