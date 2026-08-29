#!/usr/bin/env bash
# Idempotent Cloud Agent bootstrap for orgbot-hub.
# Prepares the native (no-Docker) catalog stack: PostgreSQL 16, project
# dependencies, and the PostgREST binary the start command serves the API with.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# System dependency: PostgreSQL 16 backs the "catalog without Docker" flow that
# scripts/start-local-catalog.sh drives (it calls `pg_ctlcluster 16 main`).
if ! command -v pg_ctlcluster >/dev/null 2>&1; then
  sudo apt-get update
  sudo DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    postgresql-16 postgresql-client-16
fi

# Project dependencies (pnpm 10 / Node 22 ship in the base image).
corepack pnpm install --frozen-lockfile

# Pre-fetch PostgREST so the first boot's start command is fast and does not
# depend on GitHub being reachable at start time. Mirrors the download guarded
# inside scripts/start-local-catalog.sh.
PGREST_DIR="$ROOT/.local/postgrest"
PGREST_BIN="$PGREST_DIR/postgrest"
if [ ! -x "$PGREST_BIN" ]; then
  mkdir -p "$PGREST_DIR"
  curl -fsSL "https://github.com/PostgREST/postgrest/releases/download/v14.17/postgrest-v14.17-linux-static-x86-64.tar.xz" \
    | tar -xJ -C "$PGREST_DIR"
fi
