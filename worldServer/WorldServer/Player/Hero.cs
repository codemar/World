using System;
namespace WorldServer
{
	public class Hero
	{
		public Position pixelPosition { get; set; }
		public int Width { get; set; }
		public int Height { get; set; }
		public byte[] Blocks { get; set; }
	}
}
