import requests
import json
import os

spotify_base_url = os.environ.get('SPOTIFY_BASE_URL')

def get_now_playing(token):
    headers = {
        "Authorization": "Bearer " + token
    }

    response = requests.get(spotify_base_url + 'me/player', headers=headers)
    return json.loads(response.content)