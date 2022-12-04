import os
import exiftool

from functions.db import redis_client

redis_client().set('foo', 'bar')

directory = 'C:/Users/kvchm/Pictures/pictures/Ollie'

for root, subdirs, files in os.walk(directory):
    for file in files:
        if not '.ini' in file:
            print(file)
            full_path = root + '/' + file
            with exiftool.ExifToolHelper() as et:
                metadata = et.get_metadata(full_path)

            for data in metadata:
                image_meta = []
                for key, value in data.items():
                    temp_meta = {
                        key: value
                    }
                    image_meta.append(temp_meta)

print(image_meta)