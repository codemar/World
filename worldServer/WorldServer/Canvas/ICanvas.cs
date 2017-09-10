using System;
namespace WorldServer.Canvas
{
	public interface ICanvas<T>
	{
		T Get(int x, int y);
		void Set(int x, int y, T value);
		byte[] GetBytes();
	}
}
