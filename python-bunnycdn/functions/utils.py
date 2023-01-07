import json

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

def create_title(title):
    split = title.split('[')[0]
    return split