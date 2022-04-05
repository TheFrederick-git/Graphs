// Clicks evaluation

function getClickedCircles(e, clicked) {
    // Returns all points clicked by user

    return points.filter(p => {
        const x = e.clientX - p.x;
        const y = e.clientY - p.y;

        // Length of a vector :)
        if (clicked) {
            return Math.sqrt(x**2 + y**2) <= canvas.height / 50;
        }
        return Math.sqrt(x**2 + y**2) > canvas.height / 50;
    })
}
