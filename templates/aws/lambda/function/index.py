import json
import os

from functions.helloworld import hello

example_url = os.environ.get('EXAMPLE_URL')

def handler(event, context):
    hello()