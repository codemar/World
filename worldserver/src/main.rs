extern crate websocket;

#[macro_use]
extern crate enum_index_derive;
extern crate enum_index;

extern crate byteorder;

mod canvas;
mod color;
mod server;
mod hero;
mod connection;
mod position;
mod world;

fn main() {
    server::server_loop();
}
