/*
By TheFrederick, 04.04.2022
*/

var buttons;
var canvas;
var ctx;
var newEdge;
var oldPoint;
var helpImage;

function main() {
    // Init. procedure

    // Variables
    buttons = document.getElementById("menu").getElementsByTagName("li");
    tableData = document.getElementById("tvals").getElementsByTagName("td");
    canvas = document.getElementById("chartCanvas");
    ctx = canvas.getContext('2d');
    newEdge = {};
    oldPoint = {};
    helpImage = new Image();
    helpImage.src = "./images/help.png";

    
    // Events
    resizeCanvas();
    helpImage.onload = function () {
        drawHelp();
    }
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("click", logic);
}