#!/usr/bin/env bash
# Genera public/og.png a partir de og.svg incrustando las capturas (librsvg no carga
# imágenes fuera de la carpeta del SVG). Requiere rsvg-convert y las fuentes Noto Sans.
set -euo pipefail
cd "$(dirname "$0")"
tmp=$(mktemp --suffix=.svg)
trap 'rm -f "$tmp"' EXIT
python3 - "$tmp" <<'PY'
import base64, re, sys
svg = open('og.svg').read()
def embed(m):
    data = base64.b64encode(open(m.group(1), 'rb').read()).decode()
    return f'xlink:href="data:image/png;base64,{data}"'
open(sys.argv[1], 'w').write(re.sub(r'xlink:href="([^"]+\.png)"', embed, svg))
PY
rsvg-convert "$tmp" -o ../public/og.png
echo "public/og.png generado"
