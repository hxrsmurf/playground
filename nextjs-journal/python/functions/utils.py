import json
import os
from datetime import datetime


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
                list_of_full_paths.append({"full_path": full_path, "file": file})
    return list_of_full_paths


def get_contents_all_paths(list_of_full_paths):
    list_contents = []
    for path in list_of_full_paths:
        full_path = path["full_path"]
        file = path["file"]
        contents = get_file_content(full_path)

        list_contents.append(
            {"full_path": full_path, "contents": contents, "file": file}
        )
    return list_contents


def convert_file_to_date(file, type):
    # 12_15_2021
    if type == "underscore":
        return datetime.strptime(file, "%m_%d_%Y").strftime("%Y-%m-%d")


def get_title_from_full_path(full_path):
    underscore_split = full_path.split(" ")
    try:
        return convert_file_to_date(underscore_split[0], "underscore")
    except Exception as e:
        print('get_title_from_full_path:', e)


def parse_contents_paths(contents_paths):
    list_parsed_contents = []
    for c in contents_paths:
        title = get_title_from_full_path(c["file"])
        c["title"] = title
        list_parsed_contents.append(c)
    return list_parsed_contents
