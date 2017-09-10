using System;
using System.Security.Cryptography;

namespace WorldServer
{
	public static class Utility
	{
		public static Position PixelPosToChunkPos(int pixelX, int pixelY)
		{
			return new Position() { X = pixelX / Chunk.CHUNK_SIZE, Y = pixelY / Chunk.CHUNK_SIZE };
		}

		public static Position PixelPosToRelativePos(int pixelX, int pixelY)
		{
			return new Position() { X = pixelX % Chunk.CHUNK_SIZE, Y = pixelY % Chunk.CHUNK_SIZE };
		}

		public static string MakeRandomString(int randomBytesLength)
		{
			RNGCryptoServiceProvider provider = new RNGCryptoServiceProvider();
			byte[] data = new byte[randomBytesLength];
			provider.GetBytes(data);
			return BitConverter.ToString(data).Replace("-", "").ToLower();
		}
	}
}
