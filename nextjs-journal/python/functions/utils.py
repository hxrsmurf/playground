import json


def read_json_file(file):
    with open(file) as file:
        json_file = json.loads(file.read())

    return json_file


def get_file_content(file):
    try:
        with open(file, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print("get_file_content:", file, e)
