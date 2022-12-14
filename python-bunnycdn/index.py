import json

from functions.config import config
from functions.utils import create_payload
from functions.bunnycdn import get_video, upload_video

configurations = config()

# Parses yt-dlp output for now
# title = create_title(file)

folder = ''

for root, subdir, files in folder:
    for file in files:
        if '.mkv' in file or '.mp4' in file:
            path = f'{root}/{file}'
            title = file.split('.mkv')[0]
            collection_id = 'example'
            payload = create_payload(title=title,collectionId=collection_id)
            result_upload = upload_video(payload=payload, file=file)
            print(result_upload)