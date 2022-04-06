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
var showAdds;
var addImg;

function main() {
    // Init. procedure

    // Variables
    buttons = document.getElementById("menu").getElementsByTagName("li");
    tableData = document.getElementById("tvals").getElementsByTagName("td");
    canvas = document.getElementById("chartCanvas");
    addImg = document.getElementById("addimgs");
    ctx = canvas.getContext('2d');
    newEdge = {};
    oldPoint = {};
    showECount = false;
    showAdds = false;
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