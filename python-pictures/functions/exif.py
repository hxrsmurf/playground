import exiftool

def get_exif_data(file):
    image_meta = {}

    with exiftool.ExifToolHelper() as et:
        metadata = et.get_metadata(file)

    for data in metadata:
        for key, value in data.items():
            image_meta[key] = value

    return image_meta