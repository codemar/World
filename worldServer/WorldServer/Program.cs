using System;
using WorldServer.Api;

namespace WorldServer
{
	class MainClass
	{
		public static void Main(string[] args)
		{
			var webserver = new WebServer(4545);
			DrawServer.Run(); // WSS

			var worldContext = new WorldContext();
			ChunkApiController.Initialize(worldContext);
			LoginController.Initiaize(worldContext);
			PlayerController.Initiaize(worldContext);

			while(true)
			{
				
			}
		}
	}
}
