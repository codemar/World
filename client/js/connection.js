/* Communication with the server via websockets.
   
   The communication of the clients to the server is being done via binary data
   i.e. Uint8arrays that follow a strict layout. These layouts are denoted above
   the corresponding functions. 

*/
function Client(wsAdress) {
    this.wsAdress = wsAdress;
    this.ws = null;

    this.connect = function() {
        this.ws = new WebSocket(this.wsAdress, "rust-websocket");
    };


    // format: uint8array: [opcode, width (4), height (4), data (width x height x 3)]
    this.sendHeroPixels = function(width, height, blocks) {
        let blockBytes = blocksToBytes(blocks, width, height);
        let posBytes = intArrayToBytes([width, height]);
        let opCodeBytes = toUInt8Array(OpCode.SetCharacter);

        let data = concatTypedArrays([opCodeBytes, posBytes, blockBytes]);
        
        this.ws.send(data.buffer);
    };

    // format: uint8array: [opcode, x (4), y (4), r, g, b]
    this.setBlock = function(x, y, color) {
        let opCodebytes = toUInt8Array(OpCode.SetBlock);
        let posBytes = intArrayToBytes([x, y]);
        let blocks = blocksToBytes([[color]], 1, 1);

        let data = concatTypedArrays([opCodebytes, posBytes, blocks]);

        this.ws.send(data.buffer);
    };

    // format_ uint8array: [opCode, xstart (4), xend (4), ystart (4), yend (4)]
    this.getWorld = function(xStart, xEnd, yStart, yEnd, callBack) {
        let opCodeBytes = toUInt8Array(OpCode.GetWorld);
        let posBytes = intArrayToBytes([xStart, xEnd, yStart, yEnd]);
        let data = concatTypedArrays([opCodeBytes, posBytes]);

        this.ws.send(data.buffer);
    };

    // atm a ping message consists of 8 1's
    this.ping = function() {
        let msg = new Uint8Array(1);
        msg.set([OpCode.Ping]);
        this.ws.send(msg.buffer);
    };
}

// Converts a 2d array of [r, g, b] arrays into a Uint8array
function blocksToBytes(blocks, width, height) {
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
    SetCharacter: 1,
    GetWorld: 2,
    SetBlock: 3,
    Disconnect: 4
};

function toUInt8Array(thing) {
    return new Uint8Array([thing]);
}



// converts an 32 bit integer into a byte array
function intToBytes (num) {
    let buffer = new ArrayBuffer(4); // an Int32 takes 4 bytes
    let view = new DataView(buffer);
    view.setUint32(0, num, false); // byteOffset = 0; litteEndian = false
    return new Uint8Array(buffer);
}

function intArrayToBytes (arr) {
    let buffer = new ArrayBuffer(4 * arr.length);
    let view = new DataView(buffer);
    for(let i = 0; i < arr.length; i++) {
        view.setUint32(i * 4, arr[i], false);
    }
    return new Uint8Array(buffer);
}

function concatTypedArrays(arrays) {
    if(arrays.length === 0) {
        return new Uint8Array(0);
    }
    
    let length = 0;
    
    for(let i = 0; i < arrays.length; i++) {
        length += arrays[i].length;
    }
    
    let arr = new Uint8Array(length);

    let offset = 0;

    arr.set(arrays[0]);
    
    for(let i = 1; i < arrays.length; i++) {
        offset += arrays[i - 1].length;
        arr.set(arrays[i], offset);
    }

    return arr;
}
