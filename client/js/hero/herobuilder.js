let maxHeroWidth = 10;
let maxHeroHeight = 13;

function HeroBuilder(followup) {
    let $this = this;

    
    this.heroContainercanvas = document.createElement("div");
    this.heroContainercanvas.className = "heroBuilderOuter";

    this.heroContainercanvas.style.width = (maxHeroWidth + 2) * pixelSize;
    this.heroContainercanvas.style.height = (maxHeroHeight + 2) * pixelSize;
    
    this.heroCanvas = document.createElement("canvas");
    this.heroCanvas.className = "heroBuilderInner";
    

    this.heroCanvas.width = maxHeroWidth;
    this.heroCanvas.height = maxHeroHeight;

    Object.assign(this.heroCanvas.style,
                  { width: (maxHeroWidth) * pixelSize,
                    height: (maxHeroHeight) * pixelSize,
                    top: pixelSize,
                    left: pixelSize });

    this.heroContainercanvas.appendChild(this.heroCanvas);
    document.body.appendChild(this.heroContainercanvas);


    // Initialize character with empty arrays
    this.character = new Array(maxHeroHeight);
    for(let i = 0; i < maxHeroHeight; i++) {
        this.character[i] = new Array(maxHeroWidth);
    }


    this.heroCanvas.addEventListener("click", function (event) {
        if(drawing) {
            let size = getMousePos($this.heroCanvas, event);
            $this.addPixel(Math.floor(size.x), Math.floor(size.y), drawColor);
        }
    });


    this.doneCanvas = symbolToCanvas(doneSymbol, [0, 255, 0]);
    this.doneCanvas.className = "doneSymbol";

    
    this.doneCanvas.style.top = ((maxHeroHeight + 2) * pixelSize) + pixelSize;    
    
    this.heroContainercanvas.appendChild(this.doneCanvas);

    this.doneCanvas.addEventListener("click", function() {
        
    });

    this.addPixel = function(x, y, color) {
    if(x >= maxHeroWidth || y>= maxHeroHeight)
        return;
        this.character[y][x] = color;
        addPixelToCanvas(this.heroCanvas, x, y, color);
    };

    this.hide = function() {
        this.heroCanvas.style.visibility = "hidden";
        this.heroContainercanvas.style.visibility = "hidden";
    };

    this.show = function () {
        this.heroCanvas.style.visibility = "visible";
        this.heroContainercanvas.style.visibility = "visible";
    };
}


