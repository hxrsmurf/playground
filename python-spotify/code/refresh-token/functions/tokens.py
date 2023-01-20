import os
import requests
import json
from requests.auth import HTTPBasicAuth

def get_refresh_token(refresh_token):
    baseSpotifyURL = 'https://accounts.spotify.com/api/token'
    basic = HTTPBasicAuth(os.environ['SpotifyClientId'], os.environ['SpotifyClientSecret'])

    data = {
        'refresh_token': refresh_token,
        'grant_type': 'refresh_token'
    }

    result = requests.post(baseSpotifyURL, auth=basic, data=data)
    result = json.loads(result.content)

    access_token = result['access_token']
    token_type = result['token_type']

    if 'refresh_token' in result:
        refresh_token = result['refresh_token']

    return access_token, refresh_token, token_type