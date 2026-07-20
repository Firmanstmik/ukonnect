from PIL import Image
from collections import Counter

path = r"src/assets/Ukonnect team.webp"
img = Image.open(path).convert("RGBA")
print("size:", img.size)
# sample corner pixels for bg color
w, h = img.size
corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)]
print("corners:", [img.getpixel(c) for c in corners])
# sample edge strip
edge = []
for x in range(0, w, max(1, w // 20)):
    edge.append(img.getpixel((x, 0)))
    edge.append(img.getpixel((x, h - 1)))
print("edge sample unique (first 8):", list(dict.fromkeys(edge))[:8])
