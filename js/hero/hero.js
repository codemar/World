let myCharacter;

function Hero (pos, blocks) {
    let trimmedReturn = trimBlocks(blocks);
    
    this.pos = pos;
    this.blocks = trimmedReturn[0];
    this.width = trimmedReturn[1];
    this.height = trimmedReturn[2];

    // this.drawHero = function (blank) {
    //     for(let i = 0; i < blocks.length; i++) {
    //         for(let j = 0; j < blocks[i].length; j++) {
    //             if(blocks[i][j]) {
    //                 var color = (blank ? [255, 255, 255] : blocks[i][j]);
    //                 addPixelToCanvas(worldCanvas, pos.x + j,
    //                                  pos.y + i, color);
    //             }
    //         }
    //     }
    // };
    // obsolete

    // this.moveHero = function(direction) {
    //     var movement = {x: 0, y: 0};


    //     this.pos.x += movement.x;
    //     this.pos.y += movement.y;
    // };
}

function trimBlocks(blocks) {
    function arrayBounds(arr) { 
        function smallest (arr) {
            for(let i = 0; i < arr.length; i++) {
                if(arr[i])
                    return i;
            }
            return false;
        }
        function greatest (arr) {
            for(let i = arr.length - 1; i >= 0; i--) {
                if(arr[i])
                    return i;
            }
            return false;
        }
        let min = smallest(arr);
        if(min === false) return false;
        else return [min, greatest(arr)];
    }
    
    let minmax = blocks.map(arrayBounds);
    let yminmax = arrayBounds(minmax);

    if(!yminmax)
        throw "The player has to contain pixels";

    minmax = [].concat.apply([], minmax.filter((elem) => elem, minmax));

    let minx = Math.min.apply(Math, minmax);
    let maxx = Math.max.apply(Math, minmax);
    let miny = yminmax[0];
    let maxy = yminmax[1];

    let yCut = blocks.slice(miny, maxy + 1);
    let cut = yCut.map((elem) => elem.slice(minx, maxx + 1));

    return [cut, maxx - minx + 1, maxy - miny + 1];
}

let DirEnum = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

