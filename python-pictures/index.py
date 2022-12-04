import os
import json

from functions.db import redis_client, redis_check_existing, redis_set_data
from functions.exif import get_exif_data

redis_client().set('foo', 'bar')

directory = 'C:/Users/kvchm/Pictures/pictures/Ollie'

for root, subdirs, files in os.walk(directory):
    for file in files:
        if not '.ini' in file:
            full_path = root + '/' + file
            redis_data = redis_check_existing(full_path)
            if redis_data:
                json_redis_data = json.loads(redis_data)
            else:
                metadata = get_exif_data(full_path)
                redis_set_data(full_path, metadata)