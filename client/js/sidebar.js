function Sidebar () {
    var sideBarCanvas = document.createElement("canvas");
    sideBarCanvas.height = canvasPixelHeight;
    sideBarCanvas.width = 1;
    sideBarCanvas.className = "sideBar";
    
    document.body.appendChild(sideBarCanvas);

    var colors = [[255, 0, 0],
                  [0, 255, 0],
                  [0, 0, 255]];


    for(let i = 0; i < colors.length; i++) {
        let c = colors[i];
        addPixelToCanvas(sideBarCanvas, 0, i, c);
    }

    for(let i = colors.length;i < canvasPixelHeight; i++) {
        addPixelToCanvas(sideBarCanvas, 0, i, [0, 0, 0]);
    }


    sideBarCanvas.addEventListener("click", function (event) {
        let pos = getMousePos(sideBarCanvas, event),
            colorIndex = Math.floor(pos.y);
        
        if(colorIndex >= colors.length)
            return;
        
        drawColor = colors[colorIndex];
        drawing  = true;
    });

    this.hide = function() {
        sideBarCanvas.style.visibility = "hidden";
    };

    this.show = function() {
        sideBarCanvas.style.visibility = "visible";
    };
}
