import redis
import os

client = redis.Redis(
    host=os.getenv("UPSTASH_SERVER"),
    port=os.getenv("UPSTASH_PORT"),
    password=os.getenv("UPSTASH_PASSWORD"),
    ssl=True,
)

def upload_to_upstash(list_content_all_paths):
    for path in list_content_all_paths:
        print(path)