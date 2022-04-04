// Clicks evaluation

function getClickedCircles(e, clicked) {
    // Returns all points clicked by user

    return points.filter(p => {
        const xs = p.x;
        const ys = p.y;
        const xb = e.clientX;
        const yb = e.clientY;

        // Length of a vector :)
        if (clicked) {
            return Math.sqrt(xb ** 2 - 2 * xb * xs + xs ** 2 + yb ** 2 - 2 * yb * ys + ys ** 2) <= canvas.height / 50;
        }
        return Math.sqrt(xb ** 2 - 2 * xb * xs + xs ** 2 + yb ** 2 - 2 * yb * ys + ys ** 2) >= canvas.height / 50;
    })
}