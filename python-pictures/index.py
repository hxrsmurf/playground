import json
import concurrent.futures

from functions.db import redis_check_existing, redis_set_data
from functions.list_files import list_files

directory = 'C:/Users/kvchm/Pictures/pictures/'
all_files = list_files(directory)