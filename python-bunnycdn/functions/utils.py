import requests
import json

def create_video(bunny_cdn_url, headers, payload):
    response = requests.post(bunny_cdn_url, data=payload, headers=headers)
    return json.loads(response.text)['guid']

def create_headers(api_key):
    headers = {
        'accept': 'application/json',
        'content-type': 'application/*+json',
        'AccessKey': api_key
    }
    return headers

def create_payload(title, collectionId=None):
    payload = {
        'title': title,
        'collectionId': collectionId
    }
    return json.dumps(payload)

def upload_video(bunny_cdn_url, headers, guid, file):
    video_url = f'{bunny_cdn_url}/{guid}'
    file_bytes = open(file,'rb')
    response = requests.put(video_url, headers=headers,data=file_bytes)
    return response.status_code

def create_title(title):
    split = title.split('[')[0]
    return split