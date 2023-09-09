import redis
import json

pool = redis.ConnectionPool(host="127.0.0.1", port=6379, db=0)

redis_client = redis.Redis(connection_pool=pool)


def redis_check_existing(full_path):
    decoded_data = {}

    redis_data = redis_client.hgetall(full_path)

    for key, values in redis_data.items():
        decoded_key = key.decode("utf-8")
        if decoded_key == "metadata":
            decoded_data[decoded_key] = values.decode("utf-8")
        else:
            decoded_data[decoded_key] = values

    return decoded_data


def redis_set_data(folder, files, binary_file=None):
    try:
        redis_client.hset(folder, "files", json.dumps(files))

        expiration_time_seconds = False
        if expiration_time_seconds:
            redis_client.expire(folder, expiration_time_seconds)

        set_binary = False

        if set_binary:
            redis_client().hset(folder, "binary_file", binary_file)

        return True
    except:
        return False
