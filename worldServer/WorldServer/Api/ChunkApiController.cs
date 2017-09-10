using System;
using System.Web.Http;

using WorldServer.Api;
using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using WorldServer;

namespace WorldServer.Api
{
	public class ChunkApiController : ApiController
	{
		static JsonSerializerSettings settings = WorldSerializerSettings.Create();
		static WorldContext context;

		public static void Initialize(WorldContext context)
		{
			ChunkApiController.context = context;
		}

		[Route("chunk")]
		public HttpResponseMessage Get(int x, int y)
		{
			var chunk = context.World.GetChunk(x, y);

			if (chunk != null)
			{
				var chunkResponse = new ChunkResponse()
				{
					Width = Chunk.CHUNK_SIZE,
					Height = Chunk.CHUNK_SIZE,
					ColorBytes = chunk.GetColorBytes().ToString(),
					CollisionBytes = chunk.GetCollisionBytes().ToString(),
				};

				return Request.CreateResponse(HttpStatusCode.OK, 
				                              JsonConvert.SerializeObject(chunkResponse, settings));
			}


			return new HttpResponseMessage(HttpStatusCode.BadRequest);
		}
	}

	class ChunkResponse
	{
		public int Width { get; set; }
		public int Height { get; set; }
		public string ColorBytes { get; set; }
		public string CollisionBytes { get; set; }
	}
}
