using System;
using WorldServer.State;
namespace WorldServer
{
	public class WorldContext
	{
		World world;
		ClientManager clientManager;

		public WorldContext()
		{
			world = new World();
			clientManager = new ClientManager();
		}


		public World World
		{
			get;
			set;
		}

		public ClientManager ClientManager
		{
			get;
			set;
		}
	}
}