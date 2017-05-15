use std::thread;
use websocket::Server;
use connection::Connection;
use world::World;


pub fn server_loop() {
    let server = Server::bind("127.0.0.1:2794").unwrap();
    
    for request in server.filter_map(Result::ok) {
	thread::spawn(move || {
	    if !request.protocols().contains(&"rust-websocket".to_string()) {
		request.reject().unwrap();
		return;
	    }
	    let client = request.use_protocol("rust-websocket").accept().unwrap();
            let ip = client.peer_addr().unwrap();
	    println!("Connection from {}", ip);
            
	    let (receiver, sender) = client.split().unwrap();
            let world = World::new(50);

            let mut player = Connection{sender: sender, receiver: receiver,
                                        alive: false, hero: None,
                                        world: world, ip: ip};
            player.receiver_loop();

	});
    }

}


