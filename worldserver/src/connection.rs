extern crate websocket;

use hero::Hero;
use canvas::Canvas;
use websocket::client::{Reader, Writer};
use websocket::Message;
use websocket::message::Type;
use std::net::TcpStream;
use std::net::SocketAddr;
use color::Color;
use world::World;
use std::sync::{Arc, Mutex};

pub struct Connection {
    sender: Writer<TcpStream>,
    receiver: Reader<TcpStream>,
    ip: SocketAddr,
    hero: Option<Hero>,
    world_mutex: Arc<Mutex<World>>
}


impl Connection  {
    pub fn new(sender: Writer<TcpStream>,
               receiver: Reader<TcpStream>,
               ip: SocketAddr,
               world_mutex: Arc<Mutex<World>>) -> Connection {
        Connection{sender: sender, receiver: receiver, ip: ip, hero: None, world_mutex: world_mutex}
    }
        
    fn change_blocks(&mut self, width: u32, height: u32, blocks: &[u8]) {
        let canvas = Canvas::from_bytes(width, height, blocks).unwrap();
        match self.hero {
            None => {
                self.hero = Some(Hero::new(width, height, canvas));
            }
            Some(ref mut inner) => {
                inner.set_blocks(width, height, canvas);
            }
        }
    }

    pub fn receiver_loop(&mut self) {
            loop {
                let opcode = self.receive_message();

                if let Some((opc, message)) = opcode {
                    println!("Received mesage with opcode {:?} from {}", opc, self.ip);
                    
                    match opc {
                        OpCode::Disconnect => break,
                        OpCode::SetCharacter => {
                            let payload = message.payload;
                            self.change_blocks(*payload.get(1).unwrap() as u32,
                                                *payload.get(2).unwrap() as u32,
                                                &payload[3..payload.len()]);
                        },
                        OpCode::SetBlock => {
                            let payload = message.payload;
                            
                            let x = (*payload).get(1);
                            let y = (*payload).get(2);
                            let color_bytes = (*payload).get(3..6);

                            match (x, y, color_bytes) {
                                (Some(x), Some(y), Some(color_bytes)) => {
                                    let color = Color::from_bytes(color_bytes);
                                    let mut world = self.world_mutex.lock().unwrap();
                                    
                                    (*world).insert_color(*x as u32, *y as u32, color, false);
                                    println!("{:?}", *world);
                                }
                                _ => return
                            }
                        }
                        _ => ()
                    }
                }
            }
    }

    
    fn receive_message<'b>(&mut self) -> Option<(OpCode, Message<'b>)> {
        let ref mut receiver = self.receiver;
        let message : Message = receiver.incoming_messages().next().unwrap().unwrap();

        match message.opcode {
            Type::Close => {
                // println!("Client {} disconnected", ip);
                Some((OpCode::Disconnect, message, ))
            }
	    
            Type::Binary => {
                Some((decode_message(&message).unwrap(), message))
            }
            _ => None
        }
    }

    // fn send_message(&mut self) {
    //     let message = Message::binary()
        
    // }

    

}

fn decode_message(ref msg : &Message) -> Option<OpCode> {
    let ref payload = msg.payload;

    if let Some(a) = payload.get(0) {
        match *a as u32 {
            0 => Some(OpCode::Ping,),
            1 => Some(OpCode::SetCharacter),
            2 => Some(OpCode::GetWorld),
            3 => Some(OpCode::SetBlock),
            _ => None
        }
    } else {
        return None;
    }
}

#[derive(Debug)]
pub enum OpCode {
    Ping,
    SetCharacter,
    GetWorld,
    SetBlock,
    Disconnect
}


