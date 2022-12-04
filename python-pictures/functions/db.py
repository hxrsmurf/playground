import redis
import json

def redis_client():
    return redis.Redis(
        host='localhost',
        port='6379'
    )

def redis_check_existing(full_path):
    print(f'Retrieving from Redis:', full_path)
    return redis_client().get(full_path)

def redis_set_data(full_path, metadata):
    try:
        print(f'Adding to Redis:', full_path)
        redis_client().set(
            full_path, json.dumps(metadata)
        )
        return True
    except:
        return False