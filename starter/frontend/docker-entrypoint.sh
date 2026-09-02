#!/bin/sh
API_URL="${REACT_APP_MOVIE_API_URL:-http://localhost:5000}"
echo "window.MOVIE_API_URL='${API_URL}';" > /app/build/env.js
exec npm run serve
