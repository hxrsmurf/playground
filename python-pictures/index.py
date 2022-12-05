from functions.db import redis_check_existing, redis_set_data
from functions.list_files import list_files

directory = 'C:/Users/kvchm/Pictures/pictures/'
all_files = list_files(directory)

for folder, files in all_files.items():
    in_redis = redis_check_existing(folder)
    if not in_redis:
        print('Adding to Redis', folder)
        redis_set_data(folder, files)
    else:
        print('Exists in Redis', folder)