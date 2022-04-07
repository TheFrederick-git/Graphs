// Table data calculation

var tableData;
var points = [];
var edges = [];

function refreshData() {
    // Refreshes table data

    // Number of points and edges
    tableData[0].innerText = points.length;
    tableData[1].innerText = edges.length;

    // Graph type
    tableData[2].innerText = "-";

    if (points.length == 1) {
        tableData[2].innerText = "Souvislý";
        return;
    }

    if (points.length > 1) {
        let changes = 1;
        let connectedP = [];
        let allE = edges;

        while (changes >= 1) {
            changes = 0;
            for (let i = 0; i < allE.length; i++) {

                // Add first point
                if (connectedP.length == 0) {
                    connectedP.push({ x: allE[0].x1, y: allE[0].y1 });
                    connectedP.push({ x: allE[0].x2, y: allE[0].y2 });
                    continue;
                }

                // If path exists
                if (JSON.stringify(connectedP).includes(JSON.stringify({ x: allE[i].x1, y: allE[i].y1 })) || JSON.stringify(connectedP).includes(JSON.stringify({ x: allE[i].x2, y: allE[i].y2 }))) {
                    if (!(JSON.stringify(connectedP).includes(JSON.stringify({ x: allE[i].x1, y: allE[i].y1 })))) {
                        connectedP.push({ x: allE[i].x1, y: allE[i].y1 });
                    }
                    if (!(JSON.stringify(connectedP).includes(JSON.stringify({ x: allE[i].x2, y: allE[i].y2 })))) {
                        connectedP.push({ x: allE[i].x2, y: allE[i].y2 });
                    }

                    allE = allE.filter(e => {
                        return (JSON.stringify(e) != JSON.stringify(allE[i]));
                    })
                    changes++;
                }
            }

        }

        tableData[2].innerText = "Nesouvislý";
        if (connectedP.length == points.length) {
            tableData[2].innerText = "Souvislý";
        }
    }
}

function secret() {
    // It's a secret
    alert("Now it's your turn\na92a4c6f38e691ce8c670f339a801381\n-TF");
}

