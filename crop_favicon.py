import sys
from PIL import Image

try:
    img = Image.open('public/logos/arav-logo.png')
    print(f"Size: {img.size}")
    width, height = img.size
    
    # Assuming icon is on the left and is square
    # The icon usually takes up height x height from the left edge
    # We might need to trim transparent borders first to get an accurate box
    
    # Let's use getbbox() which returns the bounding box of non-zero regions
    bbox = img.getbbox()
    print(f"BBox: {bbox}")
    
    if bbox:
        # Crop to the bbox first
        cropped_img = img.crop(bbox)
        cw, ch = cropped_img.size
        # The geometric "A" mark is likely a square on the left.
        # Let's crop a square from the left side of the trimmed image.
        icon_box = (0, 0, ch, ch) # Assuming the icon is roughly square and matches the height
        icon = cropped_img.crop(icon_box)
        
        # Save it
        icon.save('app/favicon.ico', format='ICO', sizes=[(32, 32)])
        icon.save('public/icon.png', format='PNG')
        print("Favicon saved to app/favicon.ico and public/icon.png")
except Exception as e:
    print(f"Error: {e}")
