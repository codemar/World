extern crate websocket;

use hero;
use websocket::client::{Reader, Writer};
use websocket::Message;
use websocket::message::Type;
use std::net::TcpStream;
use world::Interval;
use server;

pub struct Connection {
    pub sender: Writer<TcpStream>,
    pub receiver: Reader<TcpStream>,
    pub alive: bool,
    pub hero: hero::Hero,
}


impl Connection  {
    pub fn changeBlocks(&mut self, width: u32, height: u32, blocks: &[u8]) {
        self.hero.set_blocks(width, height, blocks);
    }

    pub fn receiver_loop(&mut self) {
            loop {
                let opcode = self.receive_message();

                if let Some((opc, message)) = opcode {
                    match opc {
                        OpCode::Disconnect => break,
                        OpCode::SetCharacter => {
                            let payload = message.payload;
                            self.changeBlocks(*payload.get(1).unwrap() as u32,
                                                *payload.get(2).unwrap() as u32,
                                                &payload[3..payload.len()]);

                            self.hero.output_blocks();
                        },
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

    

}

fn decode_message(ref msg : &Message) -> Option<OpCode> {
    let ref payload = msg.payload;

    if let Some(a) = payload.get(0) {
        match *a as u32 {
            0 => Some(OpCode::Ping,),
            1 => Some(OpCode::SetCharacter),
            2 => Some(OpCode::GetWorld),
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
    Disconnect
}


