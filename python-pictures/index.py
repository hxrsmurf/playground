import os
import json

from functions.db import redis_client, redis_check_existing, redis_set_data
from functions.exif import get_exif_data

directory = 'C:/Users/kvchm/Pictures/pictures/Ollie'

for root, subdirs, files in os.walk(directory):
    for file in files:
        if not '.ini' in file:
            full_path = root + '/' + file
            print(file)

            redis_data = redis_check_existing(full_path)

            if redis_data:
                redis_metadata = json.loads(redis_data['metadata'])
                redis_binary_file = redis_data['binary_file']
            else:
                metadata = get_exif_data(full_path)
                binary_file = open(full_path, 'rb').read()
                redis_set_data(full_path, metadata, binary_file)

            break