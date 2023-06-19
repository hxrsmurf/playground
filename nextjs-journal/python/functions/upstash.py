from dotenv import load_dotenv
import redis
import os
import json

load_dotenv()

client = redis.Redis(
    host=os.getenv("UPSTASH_SERVER"),
    port=os.getenv("UPSTASH_PORT"),
    password=os.getenv("UPSTASH_PASSWORD"),
    ssl=True,
)


def upload_to_upstash(list_content_all_paths):
    for path in list_content_all_paths:
        user = os.getenv("USER")
        title = path["title"]
        json_path = json.dumps(path)
        client.hset(user, key=title, value=json_path, mapping=None, items=None)
        print(title)
