// Buttons related functions

const bcolors = {
    "addp": "#A4DD00",  // Add point button color
    "adde": "#68BC00",  // Add edge button color
    "delp": "#D33115",  // Delete point button color
    "movp": "#AB149E",  // Move point button color
    "help": "#16A5A5"   // Help button color
}

function bclick(button) {
    // When button is pushed

    // Cached values clear
    newEdge = {};
    oldPoint = {};
    redraw();

    // Turn off all buttons
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.backgroundColor = "";
    }

    // Turn on selected button
    button.style.backgroundColor = bcolors[button.id];

    // Show Help
    if (button.id == "help") {
        clearCanvas();
        drawHelp();
    }
}


function logic(e) {
    // Core logic


    let option = "";

    // Getting option
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].style.backgroundColor != "") {
            option = buttons[i].id;
        }
    }

    // Procedures
    switch (option) {
        case "addp":
            // Adds point

            points.push({ x: e.clientX, y: e.clientY });
            break;

        case "delp":
            // Deletes point

            // Click to point check
            if (!getClickedCircles(e, true)[0]) break;
            points = getClickedCircles(e, false);

            // Delete connected edges
            edges = edges.filter(edge => {
                return (JSON.stringify(points).includes(JSON.stringify({ x: edge.x1, y: edge.y1 })) && JSON.stringify(points).includes(JSON.stringify({ x: edge.x2, y: edge.y2 })));
            })
            break;

        case "adde":
            // Draw edge

            // Click to point check
            let clickedPoint = getClickedCircles(e, true)[0];

            if (!clickedPoint) {
                newEdge = {};
                break;
            };

            // Same point check
            if (newEdge.x1 == clickedPoint.x && newEdge.y1 == clickedPoint.y) {
                newEdge = {};
                break;
            }


            if (Object.keys(newEdge).length == 2) {
                newEdge["x2"] = clickedPoint.x;
                newEdge["y2"] = clickedPoint.y;

                // Duplicant edges check
                const filteredEdges = edges.filter(edge => {
                    return JSON.stringify(edge) == JSON.stringify(newEdge) || JSON.stringify(edge) == JSON.stringify({ "x1": newEdge.x2, "y1": newEdge.y2, "x2": newEdge.x1, "y2": newEdge.y1 });
                })
                if (filteredEdges[0]) {
                    newEdge = {};
                    break;
                }

                edges.push(newEdge);
                newEdge = {};
            } else {
                newEdge["x1"] = clickedPoint.x;
                newEdge["y1"] = clickedPoint.y;
            }
            break;


        case "movp":
            // Move point

            // Click to point check
            let selPoint = getClickedCircles(e, true)[0];

            // First position not set
            if (!(selPoint) && Object.keys(oldPoint).length == 0) {
                break;
            }

            if (Object.keys(oldPoint).length == 2) {
                let newPoint = {x: e.clientX, y: e.clientY};

                // Change in points
                for (let i = 0; i<points.length; i++) {
                    if (JSON.stringify(points[i]) == JSON.stringify(oldPoint)) {
                        points[i].x = newPoint.x;
                        points[i].y = newPoint.y;
                    }
                }

                // Change in edges
                for (let i = 0; i<edges.length; i++) {
                    if (JSON.stringify({x: edges[i].x1, y: edges[i].y1}) == JSON.stringify(oldPoint)) {
                        edges[i].x1 = newPoint.x;
                        edges[i].y1 = newPoint.y;
                    }
                    if (JSON.stringify({x: edges[i].x2, y: edges[i].y2}) == JSON.stringify(oldPoint)) {
                        edges[i].x2 = newPoint.x;
                        edges[i].y2 = newPoint.y;
                    }
                }

                oldPoint = {};
            } else {
                oldPoint = {x: selPoint.x, y: selPoint.y};
            }
            break;
    }

    redraw();
    refreshData();
}