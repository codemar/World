// Communication with the server via websockets.
function Client(wsAdress) {
    this.wsAdress = wsAdress;

    this.connect = function() {
        this.ws = new WebSocket(this.wsAdress, "rust-websocket");
    };

    this.setHeroPixels = function(blocks, width, height) {
        let uint8arr = blocksToUint8Array([OPCODE.SETBLOCKS, width, height], blocks, width, height);
        this.ws.send(uint8arr.buffer);
    };
}

// Converts a 2d array of [r, g, b] arrays into a Uint8array
function blocksToUint8Array(header, blocks, width, height) {
    let headerOffset = header ? header.length : 0;
    let uint8arr = new Uint8Array(headerOffset +  (width * height * 3));

    for(let i = 0; i < headerOffset; i++) {
        uint8arr[i] = header[i];
    }
    
    for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            let arrIndex = ((i * width) + j) * 3 + headerOffset;
            
            let colors;
            
            if(!blocks[i][j]) {
                colors = [255, 255, 255];
            } else {
                colors = blocks[i][j];
            }
            
            uint8arr[arrIndex] = colors[0];
            uint8arr[arrIndex + 1] = colors[1];
            uint8arr[arrIndex + 2] = colors[2];
        }
    }

    return uint8arr;    
}



let OPCODE = {
    SETBLOCKS: 0
};
