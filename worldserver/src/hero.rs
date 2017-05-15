use canvas::Canvas;
use color::Color;
use position::Pos;

pub struct Hero {
    height: u32,
    width: u32,
    position: Pos,
    blocks: Canvas<Color>
}

impl Hero {
    pub fn new(width: u32, height: u32, canvas: Canvas<Color>) -> Hero {
        Hero{ height: height, width: width, position: Pos{x: 0, y: 0},
              blocks: canvas}
    }
    
    pub fn set_blocks(&mut self, width: u32, height: u32, blocks: Canvas<Color>) {
        self.width = width;
        self.height = height;
        self.blocks = blocks;
    }
}

