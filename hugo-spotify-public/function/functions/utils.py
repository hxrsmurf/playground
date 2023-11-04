import time

def get_user_ids(users):
    list_user_ids = []

    for user in users:
        list_user_ids.append(user['id'])

    return list_user_ids