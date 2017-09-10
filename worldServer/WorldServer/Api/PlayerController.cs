using System;
using System.Web.Http;

using WorldServer.Api;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using WorldServer;

namespace WorldServer
{
	[RoutePrefix("hero")]
	public class PlayerController : ApiController
	{
		static WorldContext context;

		public static void Initiaize(WorldContext context)
		{
			PlayerController.context = context;
		}


		[Route("blocks")]
		public HttpResponseMessage PostHero(PostHeroRequest request)
		{
			var client = context.ClientManager.Get(request.GUID);

			if(client == null)
			{
				return new HttpResponseMessage(HttpStatusCode.BadRequest);
			}

			client.Hero.Width = request.Width;
			client.Hero.Height = request.Height;
			client.Hero.Blocks = Convert.FromBase64String(request.BlocksB64);

			return new HttpResponseMessage(HttpStatusCode.OK);

		}
	}

	public class PostHeroRequest
	{
		public string GUID { get; set; }
		public string BlocksB64 { get; set; }
		public int Width { get; set; }
		public int Height { get; set; }
	}
}
