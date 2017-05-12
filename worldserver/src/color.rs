use std::fmt;

pub struct Color {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
}


impl Copy for Color {
    
}

impl Clone for Color {
    fn clone(&self) -> Color {
        *self
    }
}
impl fmt::Display for Color {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {}, {})", self.red, self.green, self.blue)
    }
}
