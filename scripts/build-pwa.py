#!/usr/bin/env python3
"""Version and validate the offline shell before deployment."""
import hashlib, json, re
from pathlib import Path
root = Path(__file__).resolve().parent.parent
sw = root / "sw.js"
source = sw.read_text()
assets = re.findall(r"'(\./[^']*)'", source.split("const urls")[0])
digest = hashlib.sha256()
for asset in assets:
    path = root / ("index.html" if asset == "./" else asset[2:])
    if not path.is_file():
        raise SystemExit(f"Missing precache asset: {asset}")
    digest.update(asset.encode())
    digest.update(path.read_bytes())
for icon in json.loads((root / "manifest.webmanifest").read_text())["icons"]:
    if not (root / icon["src"]).is_file():
        raise SystemExit(f"Missing icon: {icon['src']}")
digest.update(re.sub(r"const CACHE = '[^']+';", "const CACHE = '';", source).encode())
version = "via-fidei-" + digest.hexdigest()[:16]
sw.write_text(re.sub(r"const CACHE = '[^']+';", f"const CACHE = '{version}';", source))
print(f"Validated {len(assets)} precache URLs; cache: {version}")
