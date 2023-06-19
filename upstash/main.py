from dotenv import load_dotenv
import os
import redis
import time

load_dotenv()


def redis_client():
    r = redis.Redis(
        host=os.getenv('host'),
        port=os.getenv('port'),
        password=os.getenv('password'),
        ssl=True
    )

    return r


def create_hset(key, field, value):
    client = redis_client()
    try:
        client.hset(key, field, value)
    except Exception as e:
        print('Error create_hset:', e)


def unique_time():
    return time.time()


def create_test_data(key):
    x = 0
    while x < 10:
        create_hset(value, unique_time(), unique_time())
        x += 1


def hget_all(key):
    client = redis_client()
    return client.hgetall(key)


def main():
    test = hget_all('test')
    for t in test:
        print(t.decode('utf-8'))


if __name__ == "__main__":
    main()
