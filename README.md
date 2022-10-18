# Fluent-bit data visualizer

## Development

```bash
docker compose up
```

## Production

### Run latest build

```bash
docker run -ti --rm --name=vivo -p5489:5489 -p24224:24224 ghcr.io/calyptia/vivo
```

### Build locally

```bash
docker build -t vivo --target=prod .
docker run -ti --rm --name=vivo -p5489:5489 -p24224:24224 vivo
```
