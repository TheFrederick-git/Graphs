// Show adds

const addsNum = 3;   // Number of adds
const addDelay = 10; // Add delay [seconds]

function doAdds() {
    // Looping through adds

    if (showAdds) {
        addImg.src = `./images/add (1).jpg`;
        let curAdd = 1;
        var myInterval = setInterval(function() {
            addImg.src = `./images/add (${(++curAdd) % addsNum+1}).jpg`;
        }, addDelay*1000);
    }
}

   