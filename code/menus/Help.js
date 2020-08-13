"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let backBtn = document.getElementById("backBtn");

    backBtn.addEventListener("mouseup", backToMenu);
    backBtn.addEventListener("mouseenter", playSound);
    addEventListener("keydown", keyboardInteraction)
}

function keyboardInteraction(ev) {
    if (ev.code=="Backspace") backToMenu()
}

function backToMenu() { location.replace("../../index.html") }

function playSound() {
    let sound = new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}