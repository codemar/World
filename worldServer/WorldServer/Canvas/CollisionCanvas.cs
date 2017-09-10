using System;
namespace WorldServer.Canvas
{
	public class CollisionCanvas : ICanvas<bool>
	{
		byte[] collisionBytes;
		readonly int width;
		readonly int height;

		public CollisionCanvas(int width, int height)
		{
			// Color consists of 3 bytes
			collisionBytes = new byte[(int) Math.Ceiling((width * height) / 8.0)];

			this.width = width;
			this.height = height;
		}

		public void Set(int x, int y, bool collides)
		{
			int pos = y * width + x;
			int offset = pos % 8;

			byte changeByte = collisionBytes[pos];

			if(collides)
			{
				changeByte |= (byte) (1 << (7 - offset));
			}
			else 
			{
				changeByte &= (byte) -(1 << (7 - offset));
			}

			collisionBytes[pos] = changeByte;
		}

		public bool Get(int x, int y)
		{
			int pos = y * width + x;
			int offset = pos % 8;

			byte getByte = collisionBytes[pos];

			return (getByte & (1 << (7 - offset))) != 0;
		}


		public byte[] GetBytes()
		{
			return collisionBytes;
		}

	}
}
