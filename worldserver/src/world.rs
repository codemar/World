use std::collections::HashMap;
use color::Color;
use canvas::Canvas;
use position::Pos;
use std::fmt;

pub struct World {
    color_map: HashMap<Pos, Canvas<Color>>,
    colission_map: HashMap<Pos, Canvas<bool>>,
    chunk_size: u32
}

impl World {
    pub fn new(chunk_size: u32) -> World { 
        World {
            color_map: HashMap::new(),
            colission_map: HashMap::new(),
            chunk_size: chunk_size
        }
    }

    pub fn insert_color(&mut self, x: u32, y: u32, color: Color, collides: bool) {
        let (chunk_pos, rel_pos) = self.calc_relative_coordinates(Pos{x: x, y: y});
        
        if let Some(ref mut canvas) = self.color_map.get_mut(&chunk_pos) {
            canvas.set(rel_pos, color).unwrap();
            return;
        }
        
        let mut new_chunk = self.new_color_chunk();
        new_chunk.set(rel_pos, color).unwrap();
        self.color_map.insert(chunk_pos, new_chunk);
    }
    
    fn calc_relative_coordinates(&self, position: Pos) -> (Pos, Pos) {
        let chunkx : u32 = position.x / self.chunk_size;
        let chunky : u32 = position.y / self.chunk_size;

        let relx = position.x % self.chunk_size;
        let rely = position.y % self.chunk_size;

        (Pos{x: chunkx, y: chunky}, Pos{x: relx, y: rely})
    }

    fn new_color_chunk(&self) -> Canvas<Color> {
        Canvas::<Color>::new(self.chunk_size, self.chunk_size)
    }
}

impl fmt::Debug for World {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        for (position, chunk) in &self.color_map {
            write!(f, "Chunk at position {:?}:\n{:?}", position, chunk).unwrap();
        }
        
        Ok(())
    }
}
