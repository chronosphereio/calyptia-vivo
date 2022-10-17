# Fluent-bit data visualizer

## Development

```bash
docker compose up
```

## Production

```bash
docker build -t vivo --target=prod .
docker run -ti --rm --name=vivo -p5489:5489 -p24224:24224 vivo
```
