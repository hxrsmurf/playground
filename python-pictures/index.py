import os
import json
import io
from PIL import Image

from functions.db import redis_check_existing, redis_set_data
from functions.exif import get_exif_data

directory = 'C:/Users/kvchm/Pictures/pictures/'

for root, subdirs, files in os.walk(directory):
    for file in files:
        if '.jpg'in file or '.png' in file or '.JPG' in file:
            full_path = root + '/' + file
            redis_data = redis_check_existing(full_path)

            if redis_data:
                try:
                    redis_metadata = json.loads(redis_data['metadata'])
                    redis_binary_file = io.BytesIO(redis_data['binary_file'])
                    # Show Image
                    # Image.open(redis_binary_file).show()
                except Exception as e:
                    print(e)
            else:
                add_binary_file = True

                if add_binary_file:
                    metadata = get_exif_data(full_path)
                    binary_file = open(full_path, 'rb').read()
                else:
                    metadata = full_path
                    binary_file = 'empty'

                redis_set_data(full_path, metadata, binary_file)