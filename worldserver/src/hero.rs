use canvas::Canvas;
use position;

type Pos = position::Pos;

pub struct Hero {
    height: u32,
    width: u32,
    position: Pos,
    blocks: Canvas
}

impl Hero {
    pub fn new() -> Hero {
        Hero{ height: 0, width: 0, position: Pos{x: 0, y: 0},
              blocks: Canvas::new(0, 0, &[]).unwrap()}
    }
    
    pub fn set_blocks(&mut self, width: u32, height: u32, blocks: &[u8]) {
        if let Ok(canvas) = Canvas::new(width, height, blocks) {
            self.width = width;
            self.height = height;
            self.blocks = canvas;
        }
    }
    pub fn output_blocks(&self) {
        println!("{}", self.blocks);
    }
}

