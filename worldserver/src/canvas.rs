use std::fmt;
use color;
use position;
type Color = color::Color;
type Pos = position::Pos;

pub struct Canvas {
    width: u32,
    height: u32,
    data: Vec<Color>,
    current_position: Pos
}



impl Canvas {
    pub fn new(width: u32, height: u32, bytes: &[u8]) -> Result<Canvas, ()> {
        if bytes.len() as u32 != (width * height * 3) {
            return Err(());
        }
        
        let mut colors = Vec::new();

        for i in 0..height {
            for j in 0..width {
                let ti = (i * width + j) * 3; // trueindex
                colors.push(Color{red: bytes[ti as usize],
                                  green: bytes[(ti + 1) as usize],
                                  blue: bytes[(ti + 2) as usize]});
            }
        }
        
        Ok(Canvas { width: width, height: height, data: colors, current_position: Pos {x: 0, y: 0} })
    }

    pub fn get_pixel(&self, x : u32, y : u32) -> Option<Color> {
        match self.data.get((y * self.height + x) as usize) {
            Some(colref) => Some(*colref),
            None => None
        }
    }
}

impl fmt::Display for Canvas {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for i in 0..self.height {
            for j in 0..self.width {
                if let Err(e) = write!(f, "{} ", self.data[(i * self.width + j) as usize]) {
                    return Err(e);
                }
            }
            if let Err(e) = write!(f, "\n") {
                return Err(e);
            }
        }
        return Ok(());
    }
}

impl <'a> IntoIterator for &'a Canvas {
    type Item = (Pos, Color);
    type IntoIter = CanvasIter<'a>;

    fn into_iter(self) -> Self::IntoIter {
        CanvasIter {canvas: self, current_pos: Pos{x: 0, y:0}}
    }
}

pub struct CanvasIter <'a> {
    canvas : &'a Canvas,
    current_pos : Pos
}


impl <'a> Iterator for CanvasIter<'a> {
    type Item = (Pos, Color);
    
    fn next(&mut self) -> Option<(Pos, Color)> {
        let curr_pos = self.current_pos;
        let current_color = self.canvas.get_pixel(curr_pos.x, curr_pos.y);

        self.current_pos.x += 1;

        if self.current_pos.x > self.canvas.width {
            self.current_pos.x = 0;
            self.current_pos.y += 1;
        }

        match current_color {
            Some(col) => Some((curr_pos, col)),
            None => None
        }
    }
}
