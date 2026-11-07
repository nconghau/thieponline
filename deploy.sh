#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

# Always deploy this project, regardless of the directory the script is called from.
surge "$SCRIPT_DIR" thieponline.surge.sh
