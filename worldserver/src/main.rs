extern crate websocket;


mod canvas;
mod color;
mod server;
mod hero;
mod player;
mod position;
mod world;

fn main() {
    server::server_loop();
}
