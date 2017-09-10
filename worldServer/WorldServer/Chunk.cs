using System;
using WorldServer.Canvas;

namespace WorldServer
{
	public class Chunk
	{
		public static int CHUNK_SIZE = 50; // Todo: Maybe read this from some config


		ColorCanvas colorCanvas = new ColorCanvas(CHUNK_SIZE, CHUNK_SIZE);
		CollisionCanvas collisionCanvas = new CollisionCanvas(CHUNK_SIZE, CHUNK_SIZE);

		public void SetPixel(int x, int y, Color color, bool collides)
		{
			colorCanvas.Set(x, y, color);

			if(collides)
				collisionCanvas.Set(x, y, true);
			
		}

		public void RemovePixel(int x, int y)
		{
			colorCanvas.Set(x, y, Color.WHITE);
			collisionCanvas.Set(x, y, false);
		}

		public byte[] GetColorBytes()
		{
			return colorCanvas.GetBytes();

		}

		public byte[] GetCollisionBytes()
		{
			return collisionCanvas.GetBytes();
		}

	}
}
