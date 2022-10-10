Fluent-bit data visualizer

## Development

```bash
docker compose up
```

## Production

```bash
docker build -t vivo -f dockerfiles/deploy.Dockerfile .
docker run -ti --rm --name=vivo -p5489:5489 vivo
```
