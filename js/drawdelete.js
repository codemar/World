var drawing = false;
var solid = true;
var drawColor = [0, 0, 0];

function setPixel(event, area) {
    if(!drawing)
        return;
    
    let clickPos = getMousePos(area, event);
    canvasAddPixel(area, clickPos.x, clickPos.y,
                   drawColor[0], drawColor[1], drawColor[2]);
}



