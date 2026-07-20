from PIL import Image

path = r"src/assets/ukonnect-team-cutout.webp"
img = Image.open(path).convert('RGBA')
print('Before:', img.size)

max_w = 900
if img.width > max_w:
    ratio = max_w / img.width
    img = img.resize((max_w, round(img.height * ratio)), Image.Resampling.LANCZOS)

img.save(path, 'WEBP', quality=86, method=6, lossless=False)
print('After:', img.size)
