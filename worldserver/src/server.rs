use std::thread;
use std::str;
use websocket::{Server, Message};
use websocket::message::Type;


pub fn server_loop() {
    let server = Server::bind("127.0.0.1:2794").unwrap();
    
    for request in server.filter_map(Result::ok) {
	// Spawn a new thread for each connection.
	thread::spawn(move || {
	    if !request.protocols().contains(&"rust-websocket".to_string()) {
		request.reject().unwrap();
		return;
	    }

	    let client = request.use_protocol("rust-websocket").accept().unwrap();

	    // let ip = client.peer_addr().unwrap();

	    // println!("Connection from {}", ip);


	    let (mut receiver, mut sender) = client.split().unwrap();

	    for message in receiver.incoming_messages() {
		let message: Message = message.unwrap();

		match message.opcode {
		    Type::Close => {
			let message = Message::close();
			sender.send_message(&message).unwrap();
			// println!("Client {} disconnected", ip);
			return;
		    }
		    
                    Type::Binary => {
                        handle_message(message);
                    }
		    _ => ()
		}
	    }
	});
    }

}


fn handle_message(msg : Message) {
    let payload = msg.payload;

    payload.
}
