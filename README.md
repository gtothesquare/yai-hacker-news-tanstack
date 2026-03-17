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

### build image

`docker build -t yai-news-dev .`
`docker run --rm yai-news-dev

psql -U postgres -h localhost -U postgres -d yaipnews -f backup_clean.sql
