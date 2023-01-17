import json

credentials = json.load(open('.env'))
client_id = credentials['SPOTIFY_CLIENT_ID']
client_secret = credentials['SPOTIFY_CLIENT_SECRET']