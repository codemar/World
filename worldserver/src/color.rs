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
