import requests
import os

base_url = 'https://api.cloudflare.com/client/v4'

def verify():
    url = base_url + '/user/tokens/verify'

    headers = {
        'Authorization': 'Bearer ' + os.environ['api'],
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)

    return response.status_code