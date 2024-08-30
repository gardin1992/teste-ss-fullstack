# teste-ss-fullstack

Pré-requisitos:
    docker e docker-compose instalados

Para rodar a aplicação com apenas um comando abra o terminal e execute o comando:

```bash
docker-compose up --build
docker-compose up
```

### comandos 

```
docker exec -ti postgres:latest /bin/bash

docker run -d --name teste-ss-fullstack npx prisma db push

```