import json

def read_json_file(file):
    with open(file) as file:
        json_file = json.loads(file.read())

    return json_file
