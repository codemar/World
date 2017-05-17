function World() {
    // this.leftBorder = 0;
    // this.rightBorder = 0;
    const $this = this;

    var size = getWindowSize();
    var pixelSize = size.height / canvasPixelHeight,
        canvasWidth = Math.floor(size.width / pixelSize);

    this.solids = new Array(canvasPixelHeight);
    // 2d-array of 1s / 0s
    this.colors = new Array(canvasPixelHeight);
    // 2d-array of colors in [r, g, b] format
    this.heros = []; // array of Hero objects
    
    for(let i = 0; i < this.solids.length; i++) {
        this.solids[i] = new Array(canvasWidth);
        this.colors[i] = new Array(canvasWidth);
    }
    
    this.worldCanvas = createCanvas(canvasWidth, canvasPixelHeight);
    this.worldCanvas.className = "worldCanvas";
    document.body.appendChild(this.worldCanvas);

    this.worldCanvas.addEventListener("click", function(event) {
        const pos = getMousePos($this.worldCanvas, event);
        $this.buildBlock(pos.x, pos.y, drawColor, true);
        client.setBlock(pos.x, pos.y, drawColor);
    });

    
    // rightclick remove, also opens the context menu though
    // this.worldCanvas.addEventListener("contextmenu", function(event) {
    //     const pos = getMousePos($this.worldCanvas, event);
    //     $this.removeBlock(pos.x, pos.y);
    // }); 

    this.buildBlock = function(x, y, color, solid) {
        // color = [r :number, g : number, b : number]
        const colission = this.hasHero(x, y);
        
        if(colission && solid) return;            
        this.colors[y][x] = color;
        
        if(!colission)
            addPixelToCanvas(this.worldCanvas, x, y, color);

        if(solid)
            this.solids[y][x] = 1;
        
    };
    
    this.removeBlock = function(x, y) {
        if(!this.hasHero(x, y))
            addPixelToCanvas(this.worldCanvas, x, y, [255, 255, 255]);
        this.solids[y][x] = 0;
        this.colors[y][x] = null;
    };

    this.hasHero = function(x, y) {
        for(var i = 0; i < this.heros.length; i++) {
            let hero = this.heros[i];

            if(y < hero.pos.y || y >= hero.pos.y + hero.blocks.length)
                continue;

            if(x < hero.pos.x || x >= hero.pos.x + hero.blocks[0].length)
                continue;

            let relx = x - hero.pos.x;
            let rely = y - hero.pos.y;

            if(hero.blocks[rely][relx])
                return true;
        }
        return false;
    };

    this.addHero = function(hero) {
        // check for collisions
        for(var i = 0; i < hero.blocks.length; i++) {
            for(var j = 0; j < hero.blocks[i].length; j++) {
                if(!hero.blocks[i][j])
                    continue;

                let cx = hero.pos.x + j,
                    cy = hero.pos.y + i;

                if(solid[cy] &&  solid[cy][cx] === 1)
                    throw "Hero collides with world";
            }
        }

        this.heros.push(hero);

        addPixelsToCanvas(this.worldCanvas, hero.pos, hero.blocks);
    };

    this.moveHero = function(hero, direction) {
        // if(!this.heros.contains(hero))
        //     throw "Hero doesn't exist.";

        let newPos = movePoint(hero.pos, direction);

        if(newPos.x < 0 || newPos.x + hero.width > canvasWidth) {
            return;
        } else if (newPos.y < 0 || newPos.y + hero.height > canvasPixelHeight)
            return;

        for(let i = 0; i < hero.height; i++) {
            for(let j = 0; j < hero.width; j++) {
                if(!hero.blocks[i][j])
                    continue;

                let pos = {x: newPos.x + j, y: newPos.y + i};

                if(this.solids[pos.y][pos.x])
                    return;
            }
        }

        let repaintPixels = new Array(hero.height);

        for(let i = 0; i < hero.height; i++) {
            repaintPixels[i] = this.colors[hero.pos.y + i].slice(hero.pos.x,
                                                                 hero.pos.x + hero.width);
        }

        fillEmptyPixels(repaintPixels, [255, 255, 255]);

        // repaint the canvas with the pixels of the colors array
        addPixelsToCanvas(this.worldCanvas, hero.pos, repaintPixels);

        // paint the hero in his new spot
        addPixelsToCanvas(this.worldCanvas, newPos, hero.blocks);

        // update the hero's position
        hero.pos = newPos;
        
    };

    this.drawPixel = function(x, y, color) {
        addPixelToCanvas(this.worldCanvas, x, y, color);
    };
}

function setPixel(event, canvas) {
    if(!drawing)
        return;
    
    let clickPos = getMousePos(canvas, event);
    addPixelToCanvas(canvas, clickPos.x, clickPos.y, drawColor);
}

function removeCanvas(canvas) {
    document.body.removeChild(canvas);
}

