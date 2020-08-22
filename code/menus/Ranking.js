"use strict";

(function () {
    window.addEventListener("load", main);
}());

function main() {
    let backBtn = document.getElementById("backBtn")
    let head_row = document.getElementById("head_row")
    let table= document.getElementById("main_table")

    //  LOAD PLAYERS
    let players_array=undefined
    if (localStorage.length!=0) {
        players_array= new Array(localStorage.length-1)
        for (let i_storage = 0, i_array=0; i_storage < localStorage.length; i_storage++) {
            if (localStorage.key(i_storage)!="__playing__") players_array[i_array++] = JSON.parse(localStorage.getItem(localStorage.key(i_storage)))
        }
        players_array= sortBy({"id":"by_points"}, table, players_array)
    }

    head_row.addEventListener("mouseup", goOrder)
    head_row.addEventListener("mouseenter", playSound)

    backBtn.addEventListener("mouseup", backToMenu)
    backBtn.addEventListener("mouseenter", playSound)
    addEventListener("keyup", keyboardInteraction)

    function goOrder(ev) { players_array= sortBy(ev.target, table, players_array) }
}

/*      RANKING FILLING     */
function sortBy(sort_argument, table, players_array) {
    if (players_array==undefined) { alert("First, create a career!"); return }
    let upToLow=false
    if (sort_argument.id=="by_pos") {
        if (sort_argument.selected!="by_pos") {
            upToLow=true
            sort_argument.selected="by_pos"
        } else sort_argument.selected=undefined
    } else if (sort_argument.id=="by_name") {
        players_array= mergeSort(players_array, "name")
    } else if (sort_argument.id=="by_points") {
        players_array= mergeSort(players_array, "points_record")
    } else if (sort_argument.id=="by_apples") {
        players_array= mergeSort(players_array, "apples_eaten")
    } else if (sort_argument.id=="by_special_apples") {
        players_array= mergeSort(players_array, "special_apples_eaten")
    }
    //else if (sort_argument.id=="by_creation_date")
    //else if (sort_argument.id=="by_record_date")
    
    while (table.lastChild.id!="") table.removeChild(table.lastChild)
    
    if (!upToLow) for (let i = 0; i < players_array.length; i++) fillTable(table, players_array, i)
    else for (let i = players_array.length-1; i >= 0; i--) fillTable(table, players_array, i)

    return players_array
}

function fillTable(table, players_array, i) {
    const new_row= document.createElement("tr")
    addcolumn(new_row, undefined, i+1)
    addcolumn(new_row, players_array[i], "name")
    addcolumn(new_row, players_array[i], "creation_date")
    addcolumn(new_row, players_array[i], "points_record")
    addcolumn(new_row, players_array[i], "record_date")
    addcolumn(new_row, players_array[i], "apples_eaten")
    addcolumn(new_row, players_array[i], "special_apples_eaten")
    new_row.id="player_row"
    table.appendChild(new_row)
}

function addcolumn(row, player, sort_argument) {
    const new_column= document.createElement("td")
    if (player==undefined) new_column.innerHTML= sort_argument
    else new_column.innerHTML= player[sort_argument]
    row.appendChild(new_column)
}

/*      SORTING     */
function mergeSort(players_array, sort_argument) {
    if (players_array.length < 2) return players_array

    const middle = parseInt(players_array.length / 2)
    const left   = players_array.slice(0, middle)
    const right  = players_array.slice(middle, players_array.length)

    return merge(mergeSort(left, sort_argument), mergeSort(right, sort_argument), sort_argument)
}

function merge(left, right, sort_argument) {
    let result = []

    while (left.length && right.length) {
        if (left[0][sort_argument] >= right[0][sort_argument]) result.push(left.shift())
        else result.push(right.shift());
    }

    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());

    return result;
}

/*      DEFAULT     */
function keyboardInteraction(ev) {
    if (ev.code=="Escape") backToMenu()
}

function backToMenu() { location.replace("../index.html") }

function playSound() {
    let sound = new Audio("../resources/sounds/buttonSwitchSound.mp3")
    sound.play()
}