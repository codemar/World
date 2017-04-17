let maxHeroWidth = 10;
let maxHeroHeight = 13;
let heroContainerCanvas;

function initializeHeroBuilder() {
    heroContainerCanvas = document.createElement("div");

    let size = getWindowSize(),
        pixelSize = size.height / canvasPixelHeight;

    Object.assign(heroContainerCanvas.style,
                  {width: (maxHeroWidth + 2) * pixelSize,
                   height: (maxHeroHeight + 2) * pixelSize,
                   position: "absolute",
                   margin: "auto",
                   maxWidth: "100%",
                   maxHeight: "100%",
                   overflow: "auto",
                   backgroundColor: "black",
                   left: 0,
                   right: 0,
                   top: 0,
                   bottom: 0});
    
    let heroCanvas = document.createElement("canvas");

    heroCanvas.width = maxHeroWidth;
    heroCanvas.height = maxHeroHeight;

    Object.assign(heroCanvas.style,
                  {width: (maxHeroWidth) * pixelSize,
                   height: (maxHeroHeight) * pixelSize,
                   position: "relative",
                   top: pixelSize,
                   left: pixelSize,
                   backgroundColor: "white"});

    heroContainerCanvas.appendChild(heroCanvas);
    document.body.appendChild(heroContainerCanvas);
}
