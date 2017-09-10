using System;
namespace WorldServer
{
	public class Client
	{
		readonly Hero hero = new Hero();

		public Hero Hero 
		{
			get { return hero; }
		}
	}
}
