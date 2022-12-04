import redis
import json

def redis_client():
    pool = redis.ConnectionPool(
        host='localhost',
        port=6379,
        db=0
    )
    return redis.Redis(
        connection_pool=pool
    )

def redis_check_existing(full_path):
    print(f'Retrieving from Redis:', full_path)

    decoded_data = {}

    redis_data = redis_client().hgetall(full_path)

    for key, values in redis_data.items():
        decoded_key = key.decode('utf-8')
        if decoded_key == 'metadata':
            decoded_data[decoded_key] = values.decode('utf-8')
        else:
            decoded_data[decoded_key] = values

    return decoded_data

def redis_set_data(full_path, metadata, binary_file):
    try:
        print(f'Adding to Redis:', full_path)
        redis_client().hset(
            full_path, 'metadata', json.dumps(metadata)
        )

        set_binary = True

        if set_binary:

            redis_client().hset(
                full_path, 'binary_file', binary_file
            )
        return True
    except:
        return False