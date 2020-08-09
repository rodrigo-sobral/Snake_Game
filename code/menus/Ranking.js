"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let backBtn = document.getElementById("backBtn");

    backBtn.addEventListener("mouseup", backToMenu);
    backBtn.addEventListener("mouseenter", playSound);
}

function backToMenu() {
    location.replace("../../index.html")
}

function playSound() {
    let sound = new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    let music = JSON.parse(localStorage.getItem('sound'));
    sound.volume = music.effectsVolume
    sound.play()
}