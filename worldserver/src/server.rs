use std::thread;
use websocket::Server;
use connection::Connection;
use world::World;
use std::sync::{Arc, Mutex};


pub fn server_loop() {
    let server = Server::bind("127.0.0.1:2794").unwrap();

    // Arc of a mutex of our world, so that all the threads that handle websocket requests can access the world simultaneously;
    let world : Arc<Mutex<World>> = Arc::new(Mutex::new(World::new(50)));


    // Spawn a new thread for every in comming connection and handle the requests
    for request in server.filter_map(Result::ok) {
        
        // Create a mew reference to the world mutex
        let shared_world = world.clone();
        
	thread::spawn(move || {
	    if !request.protocols().contains(&"rust-websocket".to_string()) {
		request.reject().unwrap();
		return;
	    }
            
	    let client = request.use_protocol("rust-websocket").accept().unwrap();
            let ip = client.peer_addr().unwrap();
	    println!("Connection from {}", ip);
            
	    let (receiver, sender) = client.split().unwrap();
            
            let mut player = Connection::new(sender, receiver, ip, shared_world);
            player.receiver_loop();

	});
    }

}


