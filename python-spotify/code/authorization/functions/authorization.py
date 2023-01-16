import os
import logging
import json

import requests
from requests.auth import HTTPBasicAuth

def get_access_token(code):
    base_spotify_url = 'https://accounts.spotify.com/api/token'

    http_basic_auth = HTTPBasicAuth(os.environ['SpotifyClientId'], os.environ['SpotifyClientSecret'])

    data = {
        'code': code,
        'redirect_uri': os.environ['RedirectUri'],
        'grant_type': 'authorization_code'
    }

    req = requests.post(base_spotify_url, auth=http_basic_auth, data=data)

    content = json.loads(req.content)

    logging.info(content)

    access_token = content['access_token']
    refresh_token = content['refresh_token']

    return access_token, refresh_token