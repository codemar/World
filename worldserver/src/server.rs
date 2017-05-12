use std::thread;
use std::net::TcpStream;
use websocket::{Server, Message};
use websocket::message::Type;
use websocket::client::{Reader};
use player::Player;
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
	    let (receiver, mut sender) = client.split().unwrap();

            let mut player = Player{sender: sender, receiver: receiver, alive: false, hero: Hero::new()};

            loop {
                let opcode = receive_message(&mut player.receiver);

                if let Some((opc, message)) = opcode {
                    match opc {
                        OpCode::Disconnect => break,
                        OpCode::SetCharacter => {
                            let payload = message.payload;
                            player.changeBlocks(*payload.get(1).unwrap() as u32,
                                                *payload.get(2).unwrap() as u32,
                                                &payload[3..payload.len()]);

                            player.hero.output_blocks();
                        },
                        _ => ()
                    }
                }
                
            }
	});
    }

}

fn receive_message<'b>(ref mut receiver: & mut Reader<TcpStream>) -> Option<(OpCode, Message<'b>)> {
    let message : Message = receiver.incoming_messages().next().unwrap().unwrap();

    match message.opcode {
        Type::Close => {
            // println!("Client {} disconnected", ip);
            Some((OpCode::Disconnect, message))
        }
	
        Type::Binary => {
            Some((decode_message(&message).unwrap(), message))
        }
        _ => None
    }
}



fn decode_message(ref msg : &Message) -> Option<OpCode> {
    let ref payload = msg.payload;

    if let Some(a) = payload.get(0) {
        let opcode = get_opcode(*a as u32);

        if let Some(b) = opcode {
            match b
            {
                OpCode::Ping => opcode,
                OpCode::SetCharacter => opcode,
                _ => None
            }
        } else {
            return None;
        }
    } else {
        return None;
    }
}

#[derive(Copy, Clone)]
enum OpCode {
    Ping,
    SetCharacter,
    Disconnect
}



fn get_opcode(i : u32) -> Option<OpCode> {
    match i {
        0 => return Some(OpCode::Ping,),
        1 => return Some(OpCode::SetCharacter),
        _ => return None
    }
}
