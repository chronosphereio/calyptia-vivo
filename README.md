# Vivo

[Vivo](https://github.com/calyptia/vivo) provides a visualization interface for _logs_, _metrics,_ and _traces_.

![Screenshot of the UI](docs/hello_calyptia.png)

## Why a rewrite ?

This version has been refactored significantly since the previous version for a few improvements:

- Support the existing Logs type, but also Metrics and Traces.
- Reduce image size.
- Use dedicated Vivo output plugin from Fluent Bit.

The previous version used to depend on Fluent Bit `stdout` to trap records output which is difficult and brittle to extend for different types of telemetry data.

## Architecture

The following components are used in Vivo:

- [component] [service/](./service): Golang service that starts/manages Fluent Bit
- [component] [frontend/](./frontend): Frontend React App that pulls telemetry data from Fluent Bit (new approach)
- [component] Fluent Bit: telemetry agent with new export/streaming capabilities

To simplify the data management per type, Fluent Bit now supports a new output plugin called [Vivo Exporter](https://docs.fluentbit.io/manual/v/dev-2.1/pipeline/outputs/vivo-exporter).
This plugin buffers telemetry data in a queue of a fixed size and exposes the content through HTTP endpoints: `/logs`, `/metrics`, `/traces`. 
The UI part pulls data from there.

All the data retrieved from the Fluent Bit Vivo Exporter is in JSON format, and each event type has a well-defined specific structure.

## Running locally

Make sure you have Docker in your environment, then inside this repository, start the services with `docker compose` (or for older versions `docker-compose`):

```shell
docker compose up
```

You can access the Web interface by using the following address: <http://127.0.0.1:8000>

After a successful start, the following end-points will be available:

| Port | Interface | Description |
| --- | --- | --- |
| 8000 | Web UI | The web interface for Vivo |
| 9000 | Forward Input | Data ingestion by using Fluent Forward protocol |
| 9010 | HTTP Input | Data ingestion through HTTP |
| 2025 | Vivo Exporter | Fluent Bit Vivo streams where the UI pulls data from. This is always exposed. |

### Ingesting sample data

Let's use `curl`:

```shell
curl -XPOST -H "Content-Type: application/json" -d '{"hello": "Calyptia!"}' http://127.0.0.1:9010
```

## Known Issues or fixes needed

- When ingesting 1 record with Curl, the UI is not rendering the content, but when sending a second record it gets rendered properly. This is a bug in the UI code.

- The UI tabs for metrics and traces should print just raw JSON. Note that for logs there is a expected schema where the UI use that to render the content. If metrics and traces are received, the rendering will fail due to the unexpected schema.

- UI parity level with original Vivo UI version.
