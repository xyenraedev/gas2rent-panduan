"""Crops the supplied logo to its ink and writes the two sizes the page needs."""
from pathlib import Path

from PIL import Image

SRC = Path(r"C:\Users\arife\Downloads\infinity_car_logo_512.png")
PUBLIC = Path(r"C:\dev\gas2rent-panduan\public")

image = Image.open(SRC).convert("RGBA")

# Trim the transparent margin so the mark fills the height it is given.
box = image.split()[3].getbbox()
if box:
    image = image.crop(box)

image.save(PUBLIC / "logo.png", "PNG", optimize=True)
print("logo.png", image.size)

# Square icon for the browser tab: the mark, centred on a transparent square.
side = max(image.size)
icon = Image.new("RGBA", (side, side), (0, 0, 0, 0))
icon.paste(image, ((side - image.width) // 2, (side - image.height) // 2))
icon = icon.resize((128, 128), Image.LANCZOS)
icon.save(PUBLIC / "icon.png", "PNG", optimize=True)
print("icon.png", icon.size)
