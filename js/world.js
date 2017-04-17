var xOffset = 0;


function World() {
    this.columnList = [];
    this.leftBorder = 0;
    this.rightBorder = 0;

    var size = getWindowSize();

    var ratio = canvasPixelWidth / canvasPixelHeight,
        widthPerCanvas = ratio * size.height,
        columnAmount = Math.floor(size.width / widthPerCanvas);

    for(var i = 0; i < columnAmount; i++) {
        this.columnList.push(new Column(this.rightBorder));
        this.rightBorder += widthPerCanvas;
    }
}

function Column(startX) {
    this.startX = startX;
    this.solidBlocks = new Array(canvasPixelHeight);

    this.canvas = addCanvas(startX);

    this.canvas.addEventListener("click", function(event) {
        setPixel(event, this);
    });
}


function addCanvas(xPos) {
    var canvas = document.createElement("canvas");
    canvas.style.height = "100%";
    canvas.style.width = "auto";
    canvas.style.position = "absolute";
    canvas.style.left = xPos;
    canvas.height = canvasPixelHeight;
    canvas.width = canvasPixelWidth;
    canvas.style.imageRendering = "pixelated";

    document.body.appendChild(canvas);
    return canvas;
}

function removeCanvas(canvas) {
    document.body.removeChild(canvas);
}


function getWindowSize() {
    var width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var height = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;

    return {width, height};
}
