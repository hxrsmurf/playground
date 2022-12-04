import redis

def redis_client():
    return redis.Redis(
        host='localhost',
        port='6379'
    )