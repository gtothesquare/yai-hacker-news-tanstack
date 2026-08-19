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

Build the image:

```sh
docker build -t news-yai-app .
```

Run database migrations once as a deployment step, before starting or replacing
the application containers:

```sh
docker compose run --rm app ./node_modules/.bin/drizzle-kit migrate
```

Start the application:

```sh
docker compose up -d app
```

The application container does not run migrations during startup. This avoids
multiple replicas attempting the same migration and allows application restarts
without requiring database schema changes.

To restore a local database backup manually:

```sh
psql -U postgres -h localhost -U postgres -d yaipnews -f backup_clean.sql
```
