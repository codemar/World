using System;
using System.Web.Http;

using WorldServer.Api;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using WorldServer;



namespace WorldServer
{
	[RoutePrefix("login")]
	public class LoginController : ApiController
	{
		public static readonly int UID_LENGTH = 64;

		static WorldContext context;


		public static void Initiaize(WorldContext context)
		{
			LoginController.context = context;
		}

		[Route("announce")]
		public HttpResponseMessage GetAnnounce()
		{
			string uid = Utility.MakeRandomString(UID_LENGTH);
			context.ClientManager.Add(uid, new Client());

			return Request.CreateResponse(HttpStatusCode.OK, new AnnounceResponse()
			{
				UID = uid,
				WebsocketPort = DrawServer.WS_PORT
			});
		}
	}

	class AnnounceResponse
	{
		public string UID { get; set; }
		public int WebsocketPort { get; set; }
	}
}
