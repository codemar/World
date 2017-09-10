using System;
namespace WorldServer
{
	public class Color
	{
		public byte RED { get; set; }
		public byte GREEN { get; set; }
		public byte BLUE { get; set; }


		public static Color WHITE = new Color() { RED = 255, GREEN = 255, BLUE = 255 };
	}
}
