use color::Color;
use position::Pos;
use std::default::Default;
use std::fmt;

pub struct Canvas<T: Copy> {
    width: u32,
    height: u32,
    data: Vec<T>
}



impl <T: Copy> Canvas<T> {
    pub fn new<U>(width: u32, height: u32) -> Canvas<U> where U: Default + Copy {
        let elem_count = width * height;
        let mut data = Vec::with_capacity((elem_count) as usize);

        for _ in 0..elem_count {
            let def : U = Default::default();
            data.push(def);
        }

        Canvas{width: width, height: height, data: data}
    }

    pub fn get(&self, position: Pos) -> Option<T> {
        if let Ok(index) = self.calculate_index(position) {
            Some(self.data[index as usize])
        } else {
            None
        }
    }

    pub fn set(&mut self, position: Pos, elem: T) -> Result<(), ()> {
        if let Ok(index) = self.calculate_index(position) {
            self.data[index as usize] = elem;
            Ok(())
        } else {
            Err(())
        }
    }

    fn calculate_index(&self, position: Pos) -> Result<u32, ()>{
        let (x, y) = (position.x, position.y);

        if x >= self.width || y >= self.height {
            Err(())
        } else {
            Ok(y * self.width + x)
        }
    }
}


impl Canvas<Color>{
    pub fn from_bytes(width: u32, height: u32, bytes: &[u8]) -> Option<Canvas<Color>> {
        if bytes.len() != (width * height * 3) as usize {
            return None;
        }

        
        let mut colors = Vec::with_capacity((width * height) as usize);
        
        for i in 0..height {
            for j in 0..width {
                let index = (((i * width) + j) * 3) as usize;
                let slice = &bytes[index..(index + 3)];
                colors.push(Color{red: slice[0], green: slice[1], blue: slice[2]});
            }
        }

        return Some(Canvas{width: width, height: height, data: colors});
    }
    
}

impl fmt::Debug for Canvas<Color> {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for i in 0..self.height {
            for j in 0..self.width {
                let index = (i * self.width + j) as usize;
                let color = self.data[index];

                if color.red != 255 || color.green != 255 || color.blue != 255 {
                    if let Err(_) = writeln!(f, "{} at {}, {}", color, j, i) {
                        ()
                    }
                }
            }
        }
        Ok(())
    }
}



// Todo
// impl fmt::Display for Canvas {
//     fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
//         for i in &self.data {
//             if let Err(e) = write!(f, "{}", i) {
//                 Err(e)
//             }
//         }
//         Ok(())
//     }
// }

// impl <'a> IntoIterator for &'a Canvas {
//     type Item = (Pos, Color);
//     type IntoIter = CanvasIter<'a>;

//     fn into_iter(self) -> Self::IntoIter {
//         CanvasIter {canvas: self, current_pos: Pos{x: 0, y:0}}
//     }
// }

// pub struct CanvasIter <'a> {
//     canvas : &'a Canvas,
//     current_pos : Pos
// }


// impl <'a> Iterator for CanvasIter<'a> {
//     type Item = (Pos, Color);

//     fn next(&mut self) -> Option<(Pos, Color)> {
//         let curr_pos = self.current_pos;
//         let current_color = self.canvas.get_pixel(curr_pos.x, curr_pos.y);

//         self.current_pos.x += 1;

//         if self.current_pos.x > self.canvas.width {
//             self.current_pos.x = 0;
//             self.current_pos.y += 1;
//         }

//         match current_color {
//             Some(col) => Some((curr_pos, col)),
//             None => None
//         }
//     }
// }
