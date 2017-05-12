let doneSymbol = [[, , , , , , 1],
                  [, , , , , 1, ],
                  [1, , , , 1, , ],
                  [, 1, , 1, , , ],
                  [, , 1, , , , ]];

let wrongSymbol = [[1, , , , 1],
                   [, 1, , 1, ],
                   [, , 1, , ],
                   [, 1, , 1, ],
                   [1, , , , 1]];





function symbolToCanvas(symbol, color) {
    let cheight = symbol.length,
        cwidth = symbol[0].length;

    let canvas = createCanvas(cwidth, cheight);

    canvas.style.width = pixelSize * cwidth,
    canvas.style.height = pixelSize * cheight;

    for(let i = 0; i < cheight; i++) {
        for(let j = 0; j < cwidth; j++) {
            if(symbol[i][j])
                addPixelToCanvas(canvas, j, i, color);
        }
    }

    return canvas;
}
