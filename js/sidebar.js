function initializeSidebar () {
    var sideBarCanvas = document.createElement("canvas");
    sideBarCanvas.height = canvasPixelHeight;
    sideBarCanvas.width = 1;
    sideBarCanvas.style.float = "right";
    sideBarCanvas.style.height = "100%";
    sideBarCanvas.style.width = "auto";
    sideBarCanvas.style.imageRendering = "pixelated";

    document.body.appendChild(sideBarCanvas);

    var colors = [[255, 0, 0],
                  [0, 255, 0],
                  [0, 0, 255]];


    for(var i = 0; i < colors.length; i++) {
        var color = colors[i];
        canvasAddPixel(sideBarCanvas, 0, i, color[0], color[1], color[2]);
    }


    sideBarCanvas.addEventListener("click", function (event) {
        var pos = getMousePos(sideBarCanvas, event),
            ncolor = colors[Math.floor(pos.y)];

        drawColor = ncolor;
        drawing  = true;
    });
}
