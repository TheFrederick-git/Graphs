/*
By TheFrederick, 04.04.2022
*/

var buttons;
var canvas;
var ctx;
var newEdge;
var oldPoint;
var helpImage;
var showECount;

function main() {
    // Init. procedure

    // Variables
    buttons = document.getElementById("menu").getElementsByTagName("li");
    tableData = document.getElementById("tvals").getElementsByTagName("td");
    canvas = document.getElementById("chartCanvas");
    ctx = canvas.getContext('2d');
    newEdge = {};
    oldPoint = {};
    showECount = false;
    helpImage = new Image();
    helpImage.src = "./images/help.png";

    
    // Events
    helpImage.onload = function () {
        drawHelp();
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("click", logic);
}