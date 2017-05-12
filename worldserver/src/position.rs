#[derive(Copy, Clone, Hash)]
pub struct Pos {
    pub x: u32,
    pub y: u32,
}

impl Eq for Pos {
    
}


impl PartialEq for Pos {
    fn eq(&self, other: &Pos) -> bool {
        self.x == other.x && self.y == other.y
    }
}
