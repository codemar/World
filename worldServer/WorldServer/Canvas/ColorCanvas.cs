using System;
namespace WorldServer.Canvas
{
	public class ColorCanvas : ICanvas<Color>
	{
		byte[] colorBytes;
		readonly int width;
		readonly int height;

		public ColorCanvas(int width, int height)
		{
			// Color consists of 3 bytes
			colorBytes = new byte[width * height * 3];

			this.width = width;
			this.height = height;
		}

		public Color Get(int x, int y)
		{
			int pos = y * width + x;
			var color = new Color();

			color.RED = colorBytes[pos];
			color.GREEN = colorBytes[pos + 1];
			color.BLUE = colorBytes[pos + 2];

			return color;
		}

		public void Set(int x, int y, Color color)
		{
			int pos = y * width + x;

			colorBytes[pos] = color.RED;
			colorBytes[pos + 1] = color.GREEN;
			colorBytes[pos + 2] = color.BLUE;
		}



		public byte[] GetBytes()
		{
			return colorBytes;
		}
			
	}
}
