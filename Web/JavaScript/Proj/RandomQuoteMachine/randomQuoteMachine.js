/**
 * add functions to be executed when window.onload event hit.
 * @param {Function} func function to be executed
 * @return {Void}
 */
function addLoadEvent(func) {
    var oldonload = window.onload;

    // if there aren't any old loadingFunc, directly replace old load func;
    if (typeof window.onload != 'function') {
        window.onload = func;
    // else add new func to old func
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * random quote machine
 * @return {Void}
 */
function machine() {
    var quote = document.getElementById("quote"),             // quote dom
        changeBtn = document.getElementById("change"),        // change btn dom
        colors = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', // random color list
            '#e74c3c', '#9b59b6', '#FB6964', '#342224',
            "#472E32", "#BDBB99", "#77B1A9", "#73A857"];
        quotes = ["quote 1", "quote 2", "quote 3", "quote 4", // random quote list
            "quote 5", "quote 6", "quote 7", "quote 8",
            "quote 9", "quote 10", "quote 11", "quote 12"];

    changeBtn.addEventListener('click', (arguments) => {
        // generate randmo index of color list and quote list
        var index = Math.floor(Math.random() * colors.length);

        // change background color to random color
        changeBtn.style.backgroundColor = colors[index];
        quote.style.color = colors[index];
        document.body.style.backgroundColor = colors[index];

        // change quote to random color
        quote.childNodes[0].nodeValue = quotes[index];
    });
}

addLoadEvent(machine);
