using System;
using System.Collections.Generic;
namespace WorldServer
{
	public class World
	{
		Dictionary<Position, Chunk> chunkDict = new Dictionary<Position, Chunk>();

		public Chunk GetChunk(int chunkX, int chunkY)
		{
			var pos = new Position() { X = chunkX, Y = chunkY };
			if (chunkDict[pos] == null)
				return null;
			else
				return chunkDict[pos];
		}

		public void SetPixel(int pixelX, int pixelY, Color color, bool collides)
		{
			var relPos = Utility.PixelPosToRelativePos(pixelX, pixelY);
			var chunkPos = Utility.PixelPosToChunkPos(pixelX, pixelY);
			var chunk = chunkDict[chunkPos];

			if(chunk == null)
			{
				chunk = new Chunk();
				chunkDict[chunkPos] = chunk;
			}

			chunk.SetPixel(relPos.X, relPos.Y, color, collides);
		}
	}
}
