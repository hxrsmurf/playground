import requests
import json
import os

from .ssm import get_ssm_parameter

clerk_base_url = os.environ.get('CLERK_BASE_URL')
clerk_secret_key = get_ssm_parameter('clerk-secret-key')

headers = {
    "Authorization": "Bearer " + clerk_secret_key
}

def list_users():
    response = requests.get(clerk_base_url + "users", headers=headers)
    return json.loads(response.content)

def get_access_tokens(users, provider):
    list_access_tokens = []

    for user in users:
        response = requests.get(clerk_base_url + "users/" + user +
                                "/oauth_access_tokens/" + provider, headers=headers)
        json_response = json.loads(response.content)

        list_access_tokens.append(
            {
                "user_id": user,
                "token": json_response[0]['token']
            })

    return list_access_tokens