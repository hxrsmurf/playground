import json

from functions.config import config
from functions.utils import create_payload
from functions.bunnycdn import get_video, upload_video

configurations = config()

file = ''

# Parses yt-dlp output for now
# title = create_title(file)

if title:
    title = title
else:
    title = file

payload = create_payload(title=title,collectionId=collection_id)
result_upload = upload_video(payload=payload, file=file)
print(result_upload)