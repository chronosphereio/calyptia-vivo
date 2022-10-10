Fluent-bit data visualizer

## Development

```bash
docker compose up
```

## Production

```bash
docker build -t vivo -f dockerfiles/deploy.Dockerfile .
docker run -ti --rm --name=vivo -p3000:3000 vivo
```
