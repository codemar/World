use std::collections::HashMap;
use color;
use canvas;
use position;

type Color = color::Color;
type Canvas = canvas::Canvas;
type Pos = position::Pos;

pub struct Interval {
    l: u32,
    u: u32
}

struct World {
    map : HashMap<Pos, Color>,
    loadedintervals : Vec<Interval>
}

impl World {
    pub fn insertCanvas(&mut self, canvas: &Canvas) {
        for (position, color) in canvas {
            self.map.insert(position, color);
        }
    }
}
