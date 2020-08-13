"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let backBtn = document.getElementById("backBtn");
    let createBtn = document.getElementById("createBtn");
    let loadBtn = document.getElementById("loadBtn");
    let playBtn = document.getElementById("playBtn");
    let name_input = document.getElementById("name");
    resetInput(name_input)
    
    createBtn.addEventListener("mouseup", goToCreation);
    createBtn.addEventListener("mouseenter", playSound);
    

    playBtn.addEventListener("mouseup", goToGame);
    playBtn.addEventListener("mouseenter", playSound);
    

    backBtn.addEventListener("mouseup", backToMenu);
    backBtn.addEventListener("mouseenter", playSound);

    addEventListener("keydown", goToKeyboard)

    function goToCreation() { createCareer(createBtn, loadBtn, playBtn, name_input) }
    function goToGame() { playGame(name_input) }
    function goToKeyboard(ev) { keyboardInteraction(ev, name_input, playBtn) }
}

function resetInput(name_input) {
    const predefined= "player"
    if (localStorage.length==0) name_input.value=predefined+(localStorage.length+1).toString()
    else name_input.value=predefined+localStorage.length.toString()
}

function createCareer(createBtn, loadBtn) {
    createBtn.style.visibility= loadBtn.style.visibility= "hidden"
    playBtn.style.visibility= name_input.style.visibility= "visible"
}

function playGame(name_input) { 
    for (let i = 0; i < localStorage.length; i++) {
        if (name_input.value=="" || name_input.value.toUpperCase()=="__playing__") {
            alert("ERROR! Invalid name!")
            resetInput(name_input); return
        } else if (localStorage.key(i).toUpperCase()==name_input.value.toUpperCase()) {
            alert("That player already exists!")
            resetInput(name_input); return
        }
    }
    const actual= new Date()
    const actual_date= actual.getDate().toString() + "-" + (actual.getMonth()+1).toString() + "-" + actual.getFullYear().toString()
    //const actual_hour= actual.getHours().toString() + ":" + actual.getMinutes().toString() + ":" + actual.getSeconds().toString()

    const new_player= {
        "creation_date" : actual_date,
        "record_date" : undefined,
        "points_record" : 0,
        "apples_eaten" : 0,
        "special_apples_eaten" : 0
    }
    localStorage.setItem("__playing__", name_input.value)
    localStorage.setItem(name_input.value, JSON.stringify(new_player))
    location.replace("../../html/Game.html") 
}

function keyboardInteraction(ev, name_input) {
    if (ev.code=="Backspace") backToMenu()
    else if (ev.code=="Enter" && playBtn.style.visibility=="visible") playGame(name_input)
}

function backToMenu() { location.replace("../../index.html") }

function playSound() {
    let sound = new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}
