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
use position::Pos;

pub struct Connection {
    pub sender: Writer<TcpStream>,
    pub receiver: Reader<TcpStream>,
    pub alive: bool,
    pub hero: Option<Hero>,
    pub world: World,
    pub ip: SocketAddr,
}


impl Connection  {
    pub fn change_blocks(&mut self, width: u32, height: u32, blocks: &[u8]) {
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
                            let x = (*payload.get(1).unwrap()) as u32;
                            let y = (*payload.get(2).unwrap()) as u32;
                            let color = Color::from_bytes(&payload[3..6]);

                            println!("{} tries to set block {} at {},{}", self.ip, color, x, y);
                            self.world.insert_color(Pos{x: x, y: y}, color, false);
                            println!("{:?}", self.world);

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

#[derive(Copy, Clone)]
pub enum OpCode {
    Ping,
    SetCharacter,
    GetWorld,
    SetBlock,
    Disconnect
}


