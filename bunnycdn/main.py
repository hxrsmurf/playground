import requests
import json
import os
from datetime import datetime

access_key = ""
library_id = ""

url = f"https://video.bunnycdn.com/library/{library_id}/videos"

def upload(episode, filename):
    url = f"https://video.bunnycdn.com/library/{library_id}/videos"
    payload = { "title" : episode }

    headers = {
        "accept": "application/json",
        "content-type": "application/*+json",
        "AccessKey": access_key
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)

    response_json = json.loads(response.content)

    video_guid = response_json['guid']

    url = f"https://video.bunnycdn.com/library/{library_id}/videos/{video_guid}"

    headers['Content-Type'] = 'video/mp4'

    print(f'Uploading {filename}', datetime.now())
    print('Start', datetime.now())

    with open(filename, 'rb') as f:
        try:
            response = requests.put(url, data=f, headers=headers)
            print(response.status_code)
            print('Video Guid:', video_guid)
            print(f'Complete uploading {filename}')
            print('Stop', datetime.now())
        except Exception as e:
            print('Could not upload:', e)

def delete(guid, headers):
    url = f"https://video.bunnycdn.com/library/{library_id}/videos/{guid}"
    response = requests.delete(url, headers=headers)
    if response.status_code != 200:
        print(f'Failure to delete for {guid} is: {response.status_code}')

def list():
    url = f"https://video.bunnycdn.com/library/{library_id}/videos"
    headers = { "accept": "application/json", "AccessKey": access_key }

    response = requests.get(url, headers=headers)
    response_json = json.loads(response.content)

    for video in response_json['items']:
        encodeProgress = video['encodeProgress']
        guid = video['guid']
        title = video['title']
        print(encodeProgress, title, guid)
        if encodeProgress == 0:
            delete(guid, headers)

def list_videos():
    url = f"https://video.bunnycdn.com/library/{library_id}/videos"
    headers = { "accept": "application/json", "AccessKey": access_key }
    videos = []

    response = requests.get(url, headers=headers)
    response_json = json.loads(response.content)

    for video in response_json['items']:
        encodeProgress = video['encodeProgress']
        guid = video['guid']
        title = video['title']
        collectionId = video['collectionId']
        videos.append({
            "title": title,
            "guid": guid,
            "collectionId": collectionId,
            "encodeProgress": encodeProgress
            })
    return videos


def determine_exists(episode):
    videos = list_videos()
    for video in videos:
        if episode in video['title']:
            return True

def walk_and_upload():
    for root, _, filenames in os.walk('.'):
        for filename in filenames:
            if "Example" in filename:
                split_name = filename.split(".")
                episode = split_name[1]
                if not determine_exists(episode):
                   print(episode, filename)
                   upload(episode, filename)

videos = list_videos()
for video in videos:
    print(video)