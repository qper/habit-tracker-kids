#!/usr/bin/env python3
"""Generate PWA icons for habit tracker app."""
from PIL import Image, ImageDraw, ImageFont
import os

ICONS_DIR = "/Users/qper/habit-tracker/public/icons"
SPLASH_DIR = "/Users/qper/habit-tracker/public/splash"

BG = (255, 107, 107)       # coral #FF6B6B
BG_DARK = (220, 80, 80)    # darker coral for gradient
WHITE = (255, 255, 255)
LIGHT = (255, 230, 210)    # warm light

def create_icon(size: int, path: str):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rounded rect background
    margin = int(size * 0.08)
    radius = int(size * 0.25)
    draw.rounded_rectangle(
        [margin, margin, size - margin, size - margin],
        radius=radius,
        fill=BG,
    )

    # Draw a simple star/checkmark emoji-like shape
    cx, cy = size // 2, size // 2
    # Draw a checkmark
    lw = max(2, int(size * 0.07))
    s = size * 0.28
    pts = [
        (cx - s * 0.6, cy),
        (cx - s * 0.1, cy + s * 0.55),
        (cx + s * 0.65, cy - s * 0.5),
    ]
    draw.line(pts, fill=WHITE, width=lw, joint="curve")

    # Star dots in corners
    dot_r = max(1, int(size * 0.04))
    dot_color = (255, 230, 200, 200)
    for dx, dy in [(-0.3, -0.3), (0.32, -0.28), (-0.28, 0.34)]:
        ox = int(cx + dx * size * 0.6)
        oy = int(cy + dy * size * 0.6)
        draw.ellipse([ox - dot_r, oy - dot_r, ox + dot_r, oy + dot_r], fill=dot_color)

    img.save(path, "PNG")
    print(f"  ✓ {path} ({size}x{size})")

def create_splash(width: int, height: int, path: str):
    img = Image.new("RGBA", (width, height), BG)
    draw = ImageDraw.Draw(img)

    # Subtle gradient effect using rectangles
    for i in range(height):
        t = i / height
        r = int(BG[0] * (1 - t * 0.2))
        g = int(BG[1] * (1 - t * 0.1))
        b = int(BG[2] * (1 + t * 0.3))
        b = min(255, b)
        draw.line([(0, i), (width, i)], fill=(r, g, b))

    # Center icon
    icon_size = min(width, height) // 4
    icon_x = (width - icon_size) // 2
    icon_y = (height - icon_size) // 2 - height // 10
    radius = icon_size // 4
    draw.rounded_rectangle(
        [icon_x, icon_y, icon_x + icon_size, icon_y + icon_size],
        radius=radius,
        fill=(255, 255, 255, 40),
    )
    # Checkmark
    lw = max(3, icon_size // 10)
    cx, cy = icon_x + icon_size // 2, icon_y + icon_size // 2
    s = icon_size * 0.25
    pts = [
        (cx - s * 0.6, cy),
        (cx - s * 0.1, cy + s * 0.55),
        (cx + s * 0.65, cy - s * 0.5),
    ]
    draw.line(pts, fill=WHITE, width=lw, joint="curve")

    img.save(path, "PNG")
    print(f"  ✓ {path} ({width}x{height})")

print("Generating icons...")
sizes = [16, 32, 48, 72, 96, 120, 128, 144, 152, 167, 180, 192, 256, 512]
for s in sizes:
    create_icon(s, f"{ICONS_DIR}/icon-{s}.png")

# Apple touch icon (standard name)
create_icon(180, f"{ICONS_DIR}/apple-touch-icon.png")
print("Icons done.")

print("Generating splash screens...")
splash_configs = [
    (430, 932, "splash-1290x2796.png"),   # iPhone 14/15 Pro Max @3x
    (390, 844, "splash-1170x2532.png"),   # iPhone 14 Pro @3x
    (375, 812, "splash-1125x2436.png"),   # iPhone X/11 Pro @3x
    (414, 896, "splash-828x1792.png"),    # iPhone 11 @2x
    (375, 667, "splash-750x1334.png"),    # iPhone 8 @2x
    (768, 1024, "splash-1536x2048.png"),  # iPad @2x
]
for w, h, name in splash_configs:
    create_splash(w * 2, h * 2, f"{SPLASH_DIR}/{name}")
print("Splash screens done.")
print("All assets generated!")
