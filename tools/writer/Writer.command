#!/bin/bash
# Double-click this in Finder to start the writing app and open it.
# (If macOS refuses the first time: right-click → Open.)

cd "$(dirname "$0")/../.." || exit 1

PORT="${PORT:-4321}"

# Already running? Just bring the tab up.
if curl -s -o /dev/null "http://localhost:$PORT/"; then
  echo "Writer is already running."
  open "http://localhost:$PORT/"
  exit 0
fi

echo "Starting the writer in $(pwd)…"
node tools/writer/server.js &
SERVER=$!

# Wait for it to answer before opening the browser.
for _ in $(seq 1 40); do
  sleep 0.25
  curl -s -o /dev/null "http://localhost:$PORT/" && break
done

open "http://localhost:$PORT/"
echo
echo "Writing app → http://localhost:$PORT"
echo "Close this window (or press ctrl-C) to stop it."
wait $SERVER
