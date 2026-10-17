#!/usr/bin/env python3
import os
import glob
from PIL import Image, ImageOps

INPUT_DIR = "/tmp/gdrive_dulceria"
OUTPUT_DIR = "/home/carmay-dev/proyectos/webDul/public/images/products"

os.makedirs(f"{OUTPUT_DIR}/cakes", exist_ok=True)
os.makedirs(f"{OUTPUT_DIR}/buffet", exist_ok=True)

def optimize_image(src_path, dest_path, max_width=800, quality=82):
    try:
        with Image.open(src_path) as img:
            # Corregir orientación EXIF automática
            img = ImageOps.exif_transpose(img)
            
            # Convertir a RGB si tiene alpha o CMYK
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
                
            # Redimensionar si supera el ancho máximo
            w, h = img.size
            if w > max_width:
                new_h = int(h * (max_width / w))
                img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
                
            # Guardar en WebP
            img.save(dest_path, "WEBP", quality=quality, method=6)
            orig_size = os.path.getsize(src_path) / 1024
            new_size = os.path.getsize(dest_path) / 1024
            print(f"✓ {os.path.basename(dest_path):30} | {orig_size:6.1f}KB → {new_size:5.1f}KB ({new_size/orig_size*100:4.1f}%)")
            return True
    except Exception as e:
        print(f"✗ Error en {src_path}: {e}")
        return False

print("=== INICIANDO OPTIMIZACIÓN WEBP ===")

# 1. BANDEJAS (Buscar los mejores JPEGs/PNGs)
bandeja_files = sorted(glob.glob(f"{INPUT_DIR}/BANDEJA*.jpeg") + glob.glob(f"{INPUT_DIR}/BANDEJA*.png"))
# Deduplicar quedándonos con JPEGs primero
seen_bandeja = {}
for f in bandeja_files:
    base = os.path.basename(f).replace(".jpeg", "").replace(".png", "")
    if base not in seen_bandeja or f.endswith(".jpeg"):
        seen_bandeja[base] = f

b_idx = 1
for base, path in sorted(seen_bandeja.items()):
    dest = f"{OUTPUT_DIR}/cakes/bandeja-{b_idx}.webp"
    optimize_image(path, dest)
    b_idx += 1

# 2. DOS PISOS
dospisos_files = sorted(glob.glob(f"{INPUT_DIR}/DOS PISOS*.jpeg") + glob.glob(f"{INPUT_DIR}/DOS PISOS*.png"))
seen_dp = {}
for f in dospisos_files:
    base = os.path.basename(f).replace(".jpeg", "").replace(".png", "")
    if base not in seen_dp or f.endswith(".jpeg"):
        seen_dp[base] = f

dp_idx = 1
for base, path in sorted(seen_dp.items()):
    dest = f"{OUTPUT_DIR}/cakes/dos-pisos-{dp_idx}.webp"
    optimize_image(path, dest)
    dp_idx += 1

# 3. REDONDOS
redondo_files = sorted(glob.glob(f"{INPUT_DIR}/REDONDO*.jpeg") + glob.glob(f"{INPUT_DIR}/REDONDO*.png") + glob.glob(f"{INPUT_DIR}/redondo*.png"))
seen_redondo = {}
for f in redondo_files:
    base = os.path.basename(f).replace(".jpeg", "").replace(".png", "").upper()
    if base not in seen_redondo or f.endswith(".jpeg"):
        seen_redondo[base] = f

r_idx = 1
for base, path in sorted(seen_redondo.items()):
    dest = f"{OUTPUT_DIR}/cakes/redondo-{r_idx}.webp"
    optimize_image(path, dest)
    r_idx += 1

# 4. BUFFET (Productos unitarios)
buffet_map = {
    "CANGREJITOS": "cangrejitos-1.webp",
    "EMPANADILLAS": "empanadillas-1.webp",
    "CUPCAKES": "cupcakes-1.webp",
    "DONITAS": "donitas-1.webp",
    "MARQUESITA": "marquesitas-1.webp",
    "PANES": "panes-1.webp"
}

for prefix, target_name in buffet_map.items():
    matches = glob.glob(f"{INPUT_DIR}/{prefix}*")
    if matches:
        dest = f"{OUTPUT_DIR}/buffet/{target_name}"
        optimize_image(matches[0], dest, max_width=600)

print("\n=== OPTIMIZACIÓN COMPLETADA CON ÉXITO ===")
