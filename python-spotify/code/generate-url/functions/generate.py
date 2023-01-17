import os

def generate_url():
    base_spotify_url = 'https://accounts.spotify.com/authorize?'
    response_type = 'response_type=code'
    state = 'state=state'
    client_id = 'client_id=' + os.environ['SpotifyClientId']
    redirect_uri = 'redirect_uri=' + os.environ['RedirectUri']

    list_scope = [
        'user-read-private',
        'user-read-email',
        'playlist-read-private',
        'user-top-read',
        'playlist-modify-public',
        'user-read-currently-playing',
        'user-read-recently-played',
        'playlist-read-collaborative',
        'playlist-modify-private',
        'user-read-playback-position',
        'user-library-read',
        'user-follow-read',
        'user-follow-modify',
        'user-modify-playback-state',
        'user-read-playback-state'
    ]

    scope = ' '.join(list_scope)

    list_combined_variables = [
        base_spotify_url + response_type,
        client_id,
        scope,
        redirect_uri,
        state
    ]

    generated_url = '&'.join(list_combined_variables)

    return generated_url