import logging
import requests

def me(access_token):
  base_spotify_url = 'https://api.spotify.com/v1/me'
  header = {
    'Authorization': 'Bearer ' + str(access_token),
    'Content-Type': 'application/json'
  }

  req = requests.get(base_spotify_url, headers=header)

  return req.content