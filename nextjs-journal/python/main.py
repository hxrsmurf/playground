import os
import datetime
import requests
import concurrent.futures
import json

from functions.utils import (
    read_json_file,
    get_file_content,
    get_path_files,
    get_contents_all_paths,
)


def post(data):
    headers = {"authorization": "meow"}
    title = data["title"]
    prod = True

    if prod:
        print(title)
        response = requests.post(
            "http://localhost:3000/api/journal",
            json={title: json.dumps(data)},
            headers=headers,
        )
        return response.status_code


def convert_title(file, root):
    # 01-02-2023 - Monday.md
    split_file = file.split(" ")[0]
    try:
        return datetime.datetime.strptime(split_file, "%m-%d-%Y").strftime("%Y-%m-%d")
    except:
        try:
            # 12_15_2021 - Unknown.md
            return datetime.datetime.strptime(split_file, "%m_%d_%Y").strftime(
                "%Y-%m-%d"
            )
        except:
            try:
                # 2019\01 - January\January 01 - Monday.md
                full_path = f"{root}\{file}"
                split_year = full_path.split("\\")
                for y in split_year:
                    if len(y) == 4:
                        year = y
                split_file = " ".join(file.split(" ")[0:2]) + " " + year
                return datetime.datetime.strptime(split_file, "%B %d %Y").strftime(
                    "%Y-%m-%d"
                )
            except:
                try:
                    # 2019\06 - June\June 01.md
                    full_path = f"{root}\{file}"
                    split_year = full_path.split("\\")
                    for y in split_year:
                        if len(y) == 4:
                            year = y
                    split_file = file.split(".")[0] + " " + year
                    return datetime.datetime.strptime(split_file, "%B %d %Y").strftime(
                        "%Y-%m-%d"
                    )
                except:
                    try:
                        # 2017\02 - February\February 1, 2017 - Wednesday.md
                        split_file = file.split(" - ")[0]
                        # February 10, 2017
                        return datetime.datetime.strptime(
                            split_file, "%B %d, %Y"
                        ).strftime("%Y-%m-%d")
                    except:
                        try:
                            # 05 - May\ May 11th, 2017.md
                            split_file = file.split(" - ")[0]
                            split_period = split_file.split(".")[0]
                            replace_th = split_period.replace("th", "")
                            try:
                                return datetime.datetime.strptime(
                                    replace_th, "%B %d, %Y"
                                ).strftime("%Y-%m-%d")
                            except:
                                try:
                                    # 05 - May\May 3rd, 2017
                                    replace_rd = split_period.replace("rd", "")
                                    return datetime.datetime.strptime(
                                        replace_rd, "%B %d, %Y"
                                    ).strftime("%Y-%m-%d")
                                except:
                                    print(
                                        f"Convert Title Exception:",
                                        file,
                                        root,
                                        split_file,
                                    )
                        except:
                            print(f"Convert Title Exception:", file, root, split_file)
        return None


def get_all_files():
    list_all_files = []

    with open(".env", "r", encoding="utf-8") as file:
        json_file = json.load(file)

    for file in json_file:
        for root, dirs, files in os.walk(file["path"]):
            for f in files:
                if (
                    "Year In Review" in root
                    or "Music" in root
                    or "Movies" in root
                    or "Overview" in root
                ):
                    continue

                if "Review" in f or ".png" in f or "References" in f:
                    continue

                title = convert_title(f, root)
                if title:
                    list_all_files.append(
                        {
                            "full_path": f"{root}\{f}",
                            "root": root,
                            "file": f,
                            "title": title,
                            "tag": file["tag"],
                        }
                    )

    return list_all_files


def testing():
    all_files = get_all_files()
    all_files_with_content = []

    for file in all_files:
        file["content"] = get_file_content(file["full_path"])
        all_files_with_content.append(file)

    with concurrent.futures.ThreadPoolExecutor(max_workers=None) as executor:
        futures_to_url = {
            executor.submit(post, file): file for file in all_files_with_content
        }


def main():
    json_file = read_json_file("paths.json")[0]
    list_of_full_paths = get_path_files(json_file["path"])
    list_contents_all_paths = get_contents_all_paths(list_of_full_paths)
    print(list_contents_all_paths)


if __name__ == "__main__":
    main()
