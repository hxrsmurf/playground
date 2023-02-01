import requests
import os
import json

base_url = 'https://api.cloudflare.com/client/v4'

def verify():
    url = base_url + '/user/tokens/verify'

    headers = {
        'Authorization': 'Bearer ' + os.environ['api'],
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)

    return response.status_code

def list_dns_records():
    url = base_url + '/zones/' + os.environ['zone_identifier'] + "/dns_records/"

    headers = {
        'Authorization': 'Bearer ' + os.environ['api'],
        'Content-Type': 'application/json',
    }

    response = requests.get(url, headers=headers)

    content = json.loads(response.content)

    return content['result']