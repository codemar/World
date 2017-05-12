use std::thread;
use websocket::Server;
use player::Connection;
use hero::Hero;


pub fn server_loop() {
    let server = Server::bind("127.0.0.1:2794").unwrap();
    
    for request in server.filter_map(Result::ok) {
	thread::spawn(move || {
	    if !request.protocols().contains(&"rust-websocket".to_string()) {
		request.reject().unwrap();
		return;
	    }
	    let client = request.use_protocol("rust-websocket").accept().unwrap();
	    let (receiver, sender) = client.split().unwrap();

            let mut player = Connection{sender: sender, receiver: receiver, alive: false, hero: Hero::new()};
            player.receiver_loop();

	});
    }

}


