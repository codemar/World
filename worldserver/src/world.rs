use std::collections::{HashMap, HashSet};
use color;
use canvas;
use position;

type Color = color::Color;
type Canvas = canvas::Canvas;
type Pos = position::Pos;

#[derive(Copy, Clone)]
pub struct Interval {
    l: u32,
    u: u32
}

struct World {
    colorMap : HashMap<Pos, Color>,
    colissionMap : HashSet<Pos>,
    loadedintervals : Vec<Interval>
}

impl World {
    pub fn insertCanvas(&mut self, canvas: &Canvas) {
        for (position, color) in canvas {
            self.colorMap.insert(position, color);
        }
    }

    pub fn insertColor(&mut self, position: Pos, color: Color, collides: bool) {
        self.colorMap.insert(position, color);

        if collides {
            self.colissionMap.insert(position);
        }
    }
}
