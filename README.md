## Yet another hacker news clone

https://news.yaip.app/

Build with tanstack start react

```
pnpm i
pnpm build
pnpm start
```

Inngest UI

```
pnpm dlx inngest-cli@latest dev
```

then http://localhost:3000/api/inngest

## Docker

Start the application and its local PostgreSQL database:

```sh
docker compose up --build
```

The app waits for PostgreSQL 18, applies pending migrations, and starts on port
`3000`. The database is published locally on port `5434` and its data is stored in the
`postgres_data` Docker volume.

The local ports and database credentials can be overridden when needed:

```sh
PORT=3001 POSTGRES_PORT=55432 POSTGRES_DB=yaipnews \
  POSTGRES_USER=postgres POSTGRES_PASSWORD=postgres docker compose up --build
```

Stop the local services while retaining the database data:

```sh
docker compose down
```

To restore a local database backup manually:

```sh
psql -U postgres -h localhost -U postgres -d yaipnews -f backup_clean.sql
```
