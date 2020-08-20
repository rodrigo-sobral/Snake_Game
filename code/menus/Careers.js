"use strict";
$ = jQuery;

(function () {
    window.addEventListener("load", main)
}())

function main() {
    let backBtn = document.getElementById("backBtn")
    let createBtn = document.getElementById("createBtn")
    let loadBtn = document.getElementById("loadBtn")
    let playBtn = document.getElementById("playBtn")

    let name_input = document.getElementById("name_input")
    let info_player_selected= document.getElementById("player_selected")
    let pass_request = document.getElementById("pass_request")
    let pass_input = document.getElementById("pass_input")

    let players_table= document.getElementById("players_table")
    
    createBtn.addEventListener("mouseup", goToCreation)
    createBtn.addEventListener("mouseenter", playSound)
    loadBtn.addEventListener("mouseup", goToLoading)
    loadBtn.addEventListener("mouseenter", playSound)

    players_table.addEventListener("mouseup", goToSelection)

    playBtn.addEventListener("mouseup", goToGame)
    playBtn.addEventListener("mouseenter", playSound)
    
    backBtn.addEventListener("mouseup", backToMenu)
    backBtn.addEventListener("mouseenter", playSound)

    addEventListener("keydown", goToKeyboard)

    function goToCreation() { createCareer(createBtn, loadBtn, playBtn, name_input, pass_request) }
    function goToLoading() { loadCareer(createBtn, loadBtn, players_table) }
    function goToSelection(ev) { selectPlayer(ev, pass_input, pass_request, info_player_selected, playBtn) }

    function goToGame() { playGame(name_input, pass_input, info_player_selected) }
    function goToKeyboard(ev) { keyboardInteraction(ev, name_input, pass_input, playBtn) }
}

function resetInputs(name_input) {    
    const predefined= "player"
    if (localStorage.length==0) name_input.value=predefined+(localStorage.length+1).toString()
    else name_input.value=predefined+localStorage.length.toString()
}

function createCareer(createBtn, loadBtn, playBtn, name_input, pass_request) {
    resetInputs(name_input)
    let name_request = document.getElementById("name_request")
    createBtn.style.visibility= loadBtn.style.visibility= "hidden"
    playBtn.style.visibility= name_request.style.visibility= pass_request.style.visibility= "visible"
}

function loadCareer(createBtn, loadBtn, players_table) {
    if (localStorage.length==0) { alert("First, create a career!"); return }
    createBtn.style.visibility= loadBtn.style.visibility= "hidden"
    players_table.style.visibility= "visible"
    //  LOAD PLAYERS
    let players_array= new Array(localStorage.length-1)
    for (let i_storage = 0, i_array=0; i_storage < localStorage.length; i_storage++) {
        if (localStorage.key(i_storage)!="__playing__") players_array[i_array++] = JSON.parse(localStorage.getItem(localStorage.key(i_storage)))
    }
    
    for (let i = 0; i < players_array.length; i++) {
        const new_row= document.createElement("tr")
        addcolumn(new_row, undefined, localStorage.key(i))
        new_row.id=localStorage.key(i)
        new_row.addEventListener("mouseenter", playSound)
        players_table.appendChild(new_row)
    }
}

function addcolumn(row, player, argument) {
    const new_column= document.createElement("td")
    if (player==undefined) new_column.innerHTML= argument
    else new_column.innerHTML= player[argument]
    row.appendChild(new_column)
}

function selectPlayer(ev, pass_input, pass_request, info_player_selected, playBtn) {
    if (ev.path[1].id!="") {
        playBtn.style.visibility= pass_request.style.visibility= info_player_selected.style.visibility= "visible"
        pass_request.style.top="60%"
        pass_input.value=""
        info_player_selected.innerHTML=ev.path[1].id
        info_player_selected.style.left="30%"
        info_player_selected.style.top="50%"
    }
}

function playFirstGame(name_input, pass_input) { 
    if (name_input.value=="") { alert("ERROR! Insert your NAME!"); return }
    else if (pass_input.value=="") { alert("ERROR! Insert a PASSWORD!"); return }
    else if (name_input.value.toUpperCase()=="__playing__") { alert("ERROR! Invalid name!"); resetInput(name_input); return } 
    else if (pass_input.value.length<5) { alert("ERROR! Password too short!"); return }
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).toUpperCase()==name_input.value.toUpperCase()) {
            alert("That player already exists!")
            resetInput(name_input); return
        }
    }
    
    const actual= new Date()
    const actual_date= actual.getDate().toString() + "-" + (actual.getMonth()+1).toString() + "-" + actual.getFullYear().toString()
    //const actual_hour= actual.getHours().toString() + ":" + actual.getMinutes().toString() + ":" + actual.getSeconds().toString()

    const key= (localStorage.length)**2
    const new_player= {
        "key" : key,
        "password" : encript(pass_input.value, key),
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

function playGame(name_input, pass_input, info_player_selected) {
    if (info_player_selected.style.visibility=="visible") {
        const player_selected= JSON.parse(localStorage.getItem(info_player_selected.innerHTML))
        console.log(desencript(player_selected["password"], player_selected["key"]))
        if (pass_input.value.toUpperCase() == desencript(player_selected["password"], player_selected["key"])) {
            localStorage.setItem("__playing__", name_input.value)
            location.replace("../../html/Game.html") 
        } else { alert("Wrong Password!"); pass_input.value="" }
    } else playFirstGame(name_input, pass_input)
}

function keyboardInteraction(ev, name_input, pass_input, playBtn) {
    if (ev.code=="Escape") backToMenu()
    else if (ev.code=="Enter" && playBtn.style.visibility=="visible") playFirstGame(name_input, pass_input)
}

function backToMenu() { location.replace("../../index.html") }

function playSound() {
    let sound = new Audio("../../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}


/*    SECURE    */
function encript(password, key) {
    return password.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 + key ) % 26 + 65));
}
function desencript(password, key) {
    return password.toUpperCase().replace(/[A-Z]/g, c => String.fromCharCode((c.charCodeAt(0)-65 - key ) % 26 + 65));
}