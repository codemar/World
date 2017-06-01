use hero::Hero;
use canvas::Canvas;
use websocket::client::{Reader, Writer};
use websocket::Message;
use std::net::TcpStream;
use std::net::SocketAddr;
use color::Color;
use world::World;
use std::sync::{Arc, Mutex};
use std::io::Cursor;
use byteorder::{BigEndian, ReadBytesExt};

use enum_index::{EnumIndex, IndexEnum};
use enum_index;

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
            let message = self.receive_message();
            
            if let Some((opc, data)) = message {
                println!("Received mesage with opcode {:?} from {}", opc, self.ip);
                
                match opc {
                    InOpCode::Disconnect => break,
                    InOpCode::SetCharacter => {
                        if data.len() >= 8
                        {
                            let width = bytesToU32(&data[0..4]);
                            let height = bytesToU32(&data[4..8]);
                            let block_data = &data[8..data.len()];

                            println!("Width: {:?}, Height: {:?}", width, height);
                            println!("Data: {:?}", block_data);
                            
                            self.change_blocks(width,
                                               height,
                                               block_data);
                        }
                    },
                    InOpCode::SetBlock => {
                        if data.len() >= 11 {
                            let x = bytesToU32(&data[0..4]);
                            let y = bytesToU32(&data[4..8]);
                            let color = Color::from_bytes(&data[8..11]);
                            let mut world = self.world_mutex.lock().unwrap();
                            (*world).insert_color(x as u32, y as u32, color, false);

                            println!("{} inserted color {} at {}, {}", self.ip, color, x, y);
                        }
                    }
                    InOpCode::GetWorld => {
                        
                    }
                    _ => ()
                }
            }
        }
    }




    fn receive_message<'a>(&mut self) -> Option<(InOpCode, Vec<u8>)> {
        let ref mut receiver = self.receiver;
        let message = receiver.incoming_messages().next();

        
        if let Some(Ok(msg)) =  message {
            let msgt : Message = msg; // Apparently you need to do this for the type annotation
            let data = msgt.payload;

            if let Some(val) = data.get(0) {
                if let Some(opcode) = InOpCode::index_enum(*val as usize) {
                    return Some((opcode, data[1..].to_vec()));
                }
            }
        }

        None
    }



}


fn bytesToU32 (bytes : &[u8]) -> u32 {
    let mut buf = Cursor::new(bytes);
    buf.read_u32::<BigEndian>().unwrap()
}

#[derive(Debug, EnumIndex, IndexEnum)]
pub enum InOpCode {
    Ping,
    SetCharacter,
    GetWorld,
    SetBlock,
    Disconnect
}
