// Canvas UI

const selColor = '#FB9E00';     // Selected point color
const pInColor = '#16A5A5';     // Inner point color
const pOutColor = '#68CCCA';    // Outer point color
const eColor = '#03c2fc';       // Edge color
const bColor = '#1f1f1f';       // Canvas background color

function clearCanvas() {
    // Clears canvas

    ctx.beginPath();
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bColor;
    ctx.fill();
    ctx.stroke();
}


function redraw() {
    // Redraws all canvas elements

    clearCanvas();

    // Edges
    for (let i = 0; i < edges.length; i++) {
        ctx.beginPath();
        ctx.strokeStyle = eColor;
        ctx.lineWidth = 7;
        ctx.shadowColor = eColor;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.moveTo(edges[i].x1, edges[i].y1);
        ctx.lineTo(edges[i].x2, edges[i].y2);
        ctx.stroke();
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 0;
    }

    // Points
    for (let i = 0; i < points.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = pInColor;
        ctx.strokeStyle = pOutColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = pOutColor;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(points[i].x, points[i].y, canvas.height / 50, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 0;
    }

    // Selected point
    if (Object.keys(newEdge).length == 2) {
        ctx.beginPath();
        ctx.fillStyle = selColor;
        ctx.strokeStyle = selColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = selColor;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(newEdge.x1, newEdge.y1, canvas.height / 50, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }

    // Point to be moved
    if (Object.keys(oldPoint).length == 2) {
        ctx.beginPath();
        ctx.fillStyle = selColor;
        ctx.strokeStyle = selColor;
        ctx.lineWidth = 2;
        ctx.shadowColor = selColor;
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.arc(oldPoint.x, oldPoint.y, canvas.height / 50, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.stroke();
    }

    // Number of connected edges
    if (showECount) {
        ctx.fillStyle = "#FFFFFF";
        for (let i = 0; i < points.length; i++) {
            // Getting the count of connected edges
            let eCount = 0;
            for (let j = 0; j < edges.length; j++) {
                if (JSON.stringify({x: edges[j].x1, y:edges[j].y1}) == JSON.stringify(points[i]) || JSON.stringify({x: edges[j].x2, y:edges[j].y2}) == JSON.stringify(points[i])) {
                    eCount++;
                }
            }

            // Writing the count
            ctx.font = `${canvas.height / 50 * 1.75}px Arial`;
            ctx.fillText(eCount, points[i].x, points[i].y + canvas.height / 50 * 3);
        }
        ctx.fillStyle = selColor;
    }
}


function drawHelp() {
    // Displays help.png

    clearCanvas();

    if (window.innerWidth > window.innerHeight) {
        helpImage.width = canvas.height / 2 * 1.55;
        helpImage.height = canvas.height / 2;
    } else {
        helpImage.width = canvas.width / 2 * 1.55;
        helpImage.height = canvas.width / 2;
    }
    ctx.drawImage(helpImage, (canvas.width - helpImage.width) / 2, (canvas.height - helpImage.height) / 2, helpImage.width, helpImage.height);
}


function resizeCanvas() {
    // Canvas rescale

    let oldX = canvas.width;
    let oldY = canvas.height;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.75;

    // If help is still active
    if (buttons[5].style.backgroundColor != "") {
        drawHelp();
        return;
    }

    // Points rescale
    for (let i = 0; i < points.length; i++) {
        points[i].x = points[i].x * canvas.width / oldX;
        points[i].y = points[i].y * canvas.height / oldY;
    }

    // Edge rescale
    for (let i = 0; i < edges.length; i++) {
        edges[i].x1 = edges[i].x1 * canvas.width / oldX;
        edges[i].y1 = edges[i].y1 * canvas.height / oldY;
        edges[i].x2 = edges[i].x2 * canvas.width / oldX;
        edges[i].y2 = edges[i].y2 * canvas.height / oldY;
    }

    redraw();
}