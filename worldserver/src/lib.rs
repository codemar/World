extern crate websocket;

use std::thread;

use websocket::{Server, Message};
use websocket::message::Type;

fn main() {
    let server = Server::bind("127.0.0.1:2794").unwrap();

    for request in server.filter_map(Result::Ok) {
        thread::spawn(move || {
            if !request.protocols().contains(&"rust-websocket".to_string()) {
                request.reject().unwrap();
                return;
            }

            Message::text("Hello");
        })
        
    }
}
