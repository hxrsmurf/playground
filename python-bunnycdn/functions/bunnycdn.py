import requests
import json

from .utils import create_headers
from .config import config

configuration = config()
bunny_cdn_url = configuration['bunny_cdn_url']
api_key = configuration['api_key']
headers = create_headers(api_key)

def create_video(payload):
    response = requests.post(bunny_cdn_url, data=payload, headers=headers)
    return json.loads(response.text)['guid']

def get_video(guid):
    video_url = f'{bunny_cdn_url}/{guid}'
    response = requests.get(video_url, headers=headers)
    json_response = json.loads(response.text)
    video_status = parse_video_status(json_response['status'])
    return video_status

def upload_video(payload, file):
    guid = create_video(payload)
    video_url = f'{bunny_cdn_url}/{guid}'
    file_bytes = open(file,'rb')
    response = requests.put(video_url, headers=headers, data=file_bytes)
    return response.status_code

def parse_video_status(status):
    if status == 0:
        return 'Created'
    elif status == 1:
        return 'Uploaded'
    elif status == 2:
        return 'Processing'
    elif status == 3:
        return 'Transcoding'
    elif status == 4:
        return 'Finished'
    elif status == 5:
        return 'Error'
    elif status == 6:
        return 'UploadFailed'
    else:
        return 'Other Error'