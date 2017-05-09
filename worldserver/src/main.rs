extern crate websocket;

mod canvas;
mod color;
mod server;

fn main() {
    server::server_loop();
}
