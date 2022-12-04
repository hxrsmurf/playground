import os
import exiftool

directory = 'C:/Users/kvchm/Pictures/pictures/Ollie'

for root, subdirs, files in os.walk(directory):
    for file in files:

        if not '.ini' in file:
            full_path = root + '/' + file
            with exiftool.ExifToolHelper() as et:
                metadata = et.get_metadata(full_path)

            for data in metadata:
                for key, value in data.items():
                    print(key, value)

            break