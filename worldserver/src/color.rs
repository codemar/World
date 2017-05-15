use std::fmt;
use std::default::Default;

#[derive(Copy,Clone, Debug)]
pub struct Color {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
}

impl fmt::Display for Color {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "(r: {}, g: {}, b: {})", self.red, self.green, self.blue)
    }
}


impl Default for Color {
    fn default() -> Color { Color{red: 255, green: 255, blue: 255}}
}

impl Color {
    pub fn from_bytes(bytes: &[u8]) -> Color {
        Color{red: bytes[0], green: bytes[1], blue: bytes[2]}
    }
}
