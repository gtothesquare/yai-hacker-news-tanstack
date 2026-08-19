#!/bin/sh
set -e

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required." >&2
  exit 1
fi

echo "Waiting for database..."
until node -e '
  const net = require("node:net");
  const databaseUrl = new URL(process.env.DATABASE_URL);
  const socket = net.createConnection({
    host: databaseUrl.hostname,
    port: Number(databaseUrl.port || 5432),
  });

  socket.setTimeout(1000);
  socket.once("connect", () => process.exit(0));
  socket.once("error", () => process.exit(1));
  socket.once("timeout", () => process.exit(1));
'; do
  echo "Database not ready, retrying in 1s..."
  sleep 1
done
echo "Database is up."

echo "Running migrations..."
node scripts/migrate.mjs

# Start the app (exec replaces the shell so signals propagate correctly)
exec "$@"
