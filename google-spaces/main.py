from json import dumps
import os

from dotenv import load_dotenv

load_dotenv()

from httplib2 import Http

def main():
    message_headers = {'Content-Type': 'application/json; charset=UTF-8'}

    space = os.getenv('space')
    key = os.getenv('key')
    token = os.getenv('token')

    url = f'https://chat.googleapis.com/v1/spaces/{space}/messages?'\
          f'key={key}'\
          f'&token={token}'

    bot_message = {
        'text': 'Hello from a Python script!'
    }

    http_obj = Http()

    response = http_obj.request(
        uri=url,
        method='POST',
        headers=message_headers,
        body=dumps(bot_message),
    )

if __name__ == '__main__':
    main()