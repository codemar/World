use color;
type Color = color::Color;

pub struct Canvas {
    width: i32,
    height: i32,
    data: Vec<Color>,
}



impl Canvas {
    pub fn new(width: i32, height: i32, bytes: &[u8]) -> Canvas {
        let mut iter = bytes.iter();
        let mut index = 0;

        
        let mut color : Option<Color> = None;
        let mut data = Vec::with_capacity((width * height) as usize);

        
        loop {
            match iter.next() {
                Some(val) => {
                    if index == 0 {
                        if let Some(x) = color {data.push(x)};
                        color = Some(Color{red: 0, green: 0, blue: 0});
                    }

                    if let Some(mut clr) = color {
                        match index {
                            0 => clr.red = *val,
                            1 => clr.green = *val,
                            2 => clr.blue = *val,
                            _ => ()
                        }
                        index = (index + 1) % 3;
                    }
                },
                None => break
            }
        }
        Canvas { width: width, height: height, data: data }
    }
}
