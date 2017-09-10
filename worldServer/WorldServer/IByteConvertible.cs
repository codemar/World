using System;
namespace WorldServer
{
	public interface IByteConvertible
	{
		byte[] ToBytes();
		int ByteCount();
	}
}
