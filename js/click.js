// Clicks evaluation

function getClickedCircles(e, clicked) {
    // Returns all points clicked by user

    const rect = canvas.getBoundingClientRect();
    return points.filter(p => {
        const x = e.clientX - rect.left - p.x;
        const y = e.clientY - rect.top- p.y;

        // Length of a vector :)
        if (clicked) {
            return Math.sqrt(x**2 + y**2) <= canvas.height / 50;
        }
        return Math.sqrt(x**2 + y**2) > canvas.height / 50;
    })
}
