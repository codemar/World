using System;
namespace WorldServer
{
	public class Position
	{

		public int X { get; set; }
		public int Y { get; set; }

		public override bool Equals(object obj)
		{
			var otherPos = (Position) obj;
			return otherPos.X == X && otherPos.Y == Y;
		}

		public override int GetHashCode()
		{
			return base.GetHashCode();
		}
	}
}
