using System;
using System.Collections.Generic;
using System.Diagnostics;
using Fleck;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using WorldServer.Api;

namespace WorldServer
{
	public class DrawServer
	{
		public static readonly int WS_PORT = 4646;
		static WorldContext context;
		static Dictionary<IWebSocketConnection, string> uids = new Dictionary<IWebSocketConnection, string>();

		JsonSerializerSettings settings = WorldSerializerSettings.Create();

		public static void Initialize(WorldContext context)
		{
			DrawServer.context = context;
		}

		public static void Run()
		{
			var server = new WebSocketServer($"ws://0.0.0.0:{WS_PORT}");
			server.Start(socket =>
			{
				socket.OnOpen = () => Debug.WriteLine($"Websocket Server up and running on port {WS_PORT}");
				socket.OnMessage = message =>
				{
					Console.WriteLine(message);

					dynamic request = JsonConvert.DeserializeObject<JObject>(message);

					Console.WriteLine(request.ToString());


					switch ((string)request.MessageType)
					{
						case "announce":
							var guid = (string)request.guid;
							if (!uids.ContainsKey(socket))
							{
								uids.Add(socket, guid);
							}
							break;
						case "draw":

							break;
					}

				};
			});
		}

		
	}

	class SetPixelRequest
	{
		public int X { get; set; }
		public int Y { get; set; }
		public Color Color { get; set; }
		public bool Collides { get; set; }
	}
}
