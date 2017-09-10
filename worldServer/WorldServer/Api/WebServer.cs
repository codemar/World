using System;
using System.IO;
using System.Linq;

using System.Web.Http;
using Owin;
using Microsoft.Owin.Hosting;
using Microsoft.Owin.Hosting.Tracing;
using System.Net.Http.Formatting;

namespace WorldServer.Api
{
	sealed class WebServer : IDisposable
	{

		public class DummyFactory : ITraceOutputFactory
		{
			public TextWriter Create(string outputFile)
			{
				return TextWriter.Null;
			}
		}

		class WebServerImplementation
		{

			public void Configuration(IAppBuilder app)
			{

				var config = new HttpConfiguration();

				var formatter = config.Formatters.JsonFormatter;
				formatter.SerializerSettings = WorldSerializerSettings.Create();

				formatter.MediaTypeMappings.Add(new RequestHeaderMapping("Accept",
								  "text/html",
								  StringComparison.InvariantCultureIgnoreCase,
								  true,
								  "application/json"));


				app.UseWebApi(config);


				config.MapHttpAttributeRoutes();
				config.EnsureInitialized();

				

			}

		}

		IDisposable server;

		public WebServer(int port)
		{
			string location = $"http://*:{port}/";
			StartOptions options = new StartOptions(location);
			options.Settings.Add(
				typeof(ITraceOutputFactory).FullName,
				typeof(DummyFactory).AssemblyQualifiedName);
			server = WebApp.Start<WebServerImplementation>(options);
		}

		public void Dispose()
		{
			if (server != null)
				server.Dispose();
		}

	}
}
