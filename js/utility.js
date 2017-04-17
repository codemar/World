
// class intened for global functions and variables

var canvasPixelWidth = 1;
var canvasPixelHeight = 50;


function canvasAddPixel(canvas, x, y, r, g, b) {
    if(x >= canvas.width || y >= canvas.height)
        return;

    
    var ctx = canvas.getContext("2d");

    var pixelArr = new Uint8ClampedArray([r, g, b, 255]),
        pixel = new ImageData(pixelArr, 1, 1);

    ctx.putImageData(pixel, x, y);
}


function  getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect(),
        // abs. size of element
        scaleX = canvas.width / rect.width,
        // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;
    // relationship bitmap vs. element for Y
    
    return {
        x: (event.clientX - rect.left) * scaleX,
        // scale mouse coordinates after they have
        y: (event.clientY - rect.top) * scaleY
        // been adjusted to be relative to element
    };
}
