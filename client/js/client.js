// Communication with the server via websockets.
function Client(wsAdress) {
    this.wsAdress = wsAdress;
    this.ws = null;

    this.connect = function() {
        this.ws = new WebSocket(this.wsAdress, "rust-websocket");
    };

    this.sendHeroPixels = function(blocks, width, height) {
        let uint8arr = blocksToUint8Array(blocks, width, height);
        uint8arr = setHeader([OpCode.SetCharacter, width, height], uint8arr);
        this.ws.send(uint8arr.buffer);
    };

    // atm a ping message consists of 8 1's
    this.ping = function() {
        let msg = new Uint8Array(1);
        msg.set([OpCode.Ping]);
        this.ws.send(msg.buffer);
    };
}

// Converts a 2d array of [r, g, b] arrays into a Uint8array
function blocksToUint8Array(blocks, width, height) {
    let uint8arr = new Uint8Array((width * height * 3));
    for(let i = 0; i < height; i++) {
        for(let j = 0; j < width; j++) {
            let arrIndex = ((i * width) + j) * 3;
            
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

// header = untyped array, arr = Uint8array
function setHeader(header, arr) {
    let newArr = new Uint8Array(header.length + arr.length);

    newArr.set(header);
    newArr.set(arr, header.length);

    return newArr;
}



let OpCode = {
    Ping: 0,
    SetCharacter: 1
};
