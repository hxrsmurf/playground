"""
    This is used to initialize the Redis database with photos.
"""

from concurrent.futures import ThreadPoolExecutor
from db import redis_set_data


def redis_all_files(all_files):
    with ThreadPoolExecutor() as executor:
        for file in all_files:
            executor.submit(
                redis_set_data(full_path=file, metadata=file, binary_file=file)
            )
