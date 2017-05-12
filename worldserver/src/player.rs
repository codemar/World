extern crate websocket;

use hero;
use websocket::client::{Reader, Writer};
use std::io::Write;
use std::net::TcpStream;
use canvas;

pub struct Player {
    pub sender: Writer<TcpStream>,
    pub receiver: Reader<TcpStream>,
    pub alive: bool,
    pub hero: hero::Hero,
}


impl Player  {
    pub fn changeBlocks(&mut self, width: u32, height: u32, blocks: &[u8]) {
        self.hero.set_blocks(width, height, blocks);
    }
}
