// class intened for global functions and variables
let canvasPixelHeight = 50;
let windowSize = getWindowSize();
let pixelSize = windowSize.height / canvasPixelHeight;



function createCanvas(width, height) {
    var canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    return canvas;
}

function addPixelToCanvas(canvas, x, y, color) {
    if(x >= canvas.width || y >= canvas.height)
        throw "Out of canvas bounds.";
    

    let newColor = color.slice(0);
    newColor.push(255);

    var pixelArr = new Uint8ClampedArray(newColor),
        pixel = new ImageData(pixelArr, 1, 1);

    var ctx = canvas.getContext("2d");
    ctx.putImageData(pixel, x, y);
}

function addPixelsToCanvas(canvas, pos, pixels) {
    let pw = pixels[0].length,
        ph = pixels.length;

    var ctx = canvas.getContext("2d");
    let bgImg = ctx.getImageData(pos.x, pos.y, pw, ph);
    let bgData = bgImg.data;

    if(pos.x + pw > canvas.width || pos.y + ph > canvas.height)
        throw "Out of canvas bounds";

    // Todo: needs debugging

    for(var i = 0; i < ph; i++) {
        for(var j = 0; j < pw; j++) {
            let p = pixels[i][j];
            if(!p)
                continue;
            
            let offset = (i * pw + j) * 4;
            bgData[offset] = p[0];
            bgData[offset + 1] = p[1];
            bgData[offset + 2] = p[2];
            bgData[offset + 3] = 255;
            
        }
    }
    bgImg.data = bgData;
    
    ctx.putImageData(bgImg, pos.x, pos.y);
}


function fillEmptyPixels(pixels, color) {
    let pw = pixels[0].length,
        ph = pixels.length;

    for(let i = 0; i < ph; i++) {
        for(let j = 0; j < pw; j++) {
            if(pixels[i][j]) continue;

            pixels[i][j] = color;
        }
    }
}




function  getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect(),
        // abs. size of element
        scaleX = canvas.width / rect.width,
        // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;
    // relationship bitmap vs. element for Y
    
    return {
        x: Math.floor((event.clientX - rect.left) * scaleX),
        // scale mouse coordinates after they have
        y: Math.floor((event.clientY - rect.top) * scaleY)
        // been adjusted to be relative to element
    };
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

function flattenArray (arr) {
    return [].concat.apply([], arr);
}


function movePoint(pos, direction) {
    var movement = {x: 0, y: 0};
        
    switch(direction) {
        case DirEnum.LEFT:
            movement.x = -1;
            break;
        case DirEnum.Up:
            movement.y = -1;
            break;
        case DirEnum.RIGHT:
            movement.x = 1;
            break;
        case DirEnum.DOWN:
            movement.y = 1;
            break;
        }

    pos.x += movement.x;
    pos.y += movement.y;

    return pos;
}
