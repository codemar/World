let myCharacter;

function Hero (pos, blocks) {
    this.pos = pos;
    this.blocks = blocks;
    this.height = blocks.length;
    this.width = blocks[0].length;

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

let DirEnum = {
    LEFT: 0,
    UP: 1,
    RIGHT: 2,
    DOWN: 3
};

