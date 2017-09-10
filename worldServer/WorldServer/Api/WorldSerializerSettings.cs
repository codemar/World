using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace WorldServer.Api
{
	public static class WorldSerializerSettings
	{
		public static JsonSerializerSettings Create()
		{

			DefaultContractResolver contractResolver = new DefaultContractResolver
			{
				NamingStrategy = new SnakeCaseNamingStrategy()
			};

			JsonSerializerSettings settings = new JsonSerializerSettings
			{
				ContractResolver = contractResolver,
				TypeNameHandling = TypeNameHandling.None,
				Formatting = Formatting.None,
			};

			settings.Converters.Add(new StringEnumConverter());

			return settings;

		}
	}
}
