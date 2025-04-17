# Web service - Mathis Brouard

## Conf

### Front
- React [localhost:3000](http://localhost:3000)
- Express with graphQL [localhost:4000](http://localhost:4000)
- Grafana [localhost:3001](http://localhost:3001)
- Prometheus [localhost:9090](http://localhost:9090)

## Init
Rename .env.example to .env 
Customise the values in the .env file (optional)

```bash
    cp .env.example .env

```bash
    cp .env.example .env
```
### Development

```bash
    docker compose -f ./compose.dev.yaml up --build --watch
```


## Stress test
```bash
  cd backend_auth
```
```bash
npx artillery run .\stress-test.yml
```