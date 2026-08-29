from PIL import Image

def make_transparent(img_path, output_path):
    img = Image.open(img_path)
    img = img.convert("RGBA")
    datas = img.getdata()
    
    newData = []
    for item in datas:
        # If pixel is close to white (RGB > 240 on all channels), make it transparent
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
            
    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

if __name__ == '__main__':
    make_transparent(
        r'C:\Users\apriy\.gemini\antigravity\brain\426e9ab1-db42-4d1a-a9e2-8652eb6e053a\.user_uploaded\media_1788030798737.png',
        r'C:\Users\apriy\.gemini\antigravity\scratch\priyanshuf1_portfolio\perfect_clone\logo_icon.png'
    )
