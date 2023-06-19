import json
import os


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


def get_path_files(path):
    list_of_full_paths = []
    for root, dirs, files in os.walk(path):
        for file in files:
            full_path = f"{root}\{file}"
            if (
                ".md" in full_path
                and not "Movies" in full_path
                and not "Review" in full_path
            ):
                list_of_full_paths.append(full_path)
    return list_of_full_paths
