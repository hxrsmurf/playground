import json
import os

from functions.dynamodb import query

def handler(event, context):
    response = query("2023-10", 10)
    return response