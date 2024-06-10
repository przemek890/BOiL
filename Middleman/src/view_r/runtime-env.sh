#!/bin/sh

echo "window.REACT_APP_SERVER_IP='$REACT_APP_SERVER_IP';" > /app/build/runtime-env.js
exec "$@"
