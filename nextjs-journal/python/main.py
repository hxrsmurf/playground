import os
import datetime
import requests
import concurrent.futures
import json


def post(data):
    headers = {
        'authorization': 'meow'
    }
    title = data['title']
    prod = False

    if prod:
        response = requests.post(
            'http://localhost:3000/api/journal',
            json={title: json.dumps(data)},
            headers=headers
        )
        return response.status_code


def convert_title(file):
    # 01-02-2023 - Monday.md
    split_file = file.split(' ')[0]
    try:
        return datetime.datetime.strptime(split_file, "%m-%d-%Y").strftime('%Y-%m-%d')
    except:
        try:
            # 12_15_2021 - Unknown.md
            return datetime.datetime.strptime(split_file, "%m_%d_%Y").strftime('%Y-%m-%d')
        except:
            print(f'Exception:', file)
        return None


def get_all_files():
    list_all_files = []

    with open('.env', 'r', encoding='utf-8') as file:
        json_file = json.load(file)

    for file in json_file:
        for root, dirs, files in os.walk(file['path']):
            for f in files:
                title = convert_title(f)
                if title:
                    list_all_files.append({
                        'full_path': f'{root}\{f}',
                        'root': root,
                        'file': f,
                        'title': title,
                        'tag': file['tag']
                    })

        return list_all_files


def get_file_content(full_path):
    with open(full_path, 'r') as file:
        return file.read()


def main():
    all_files = get_all_files()
    all_files_with_content = []

    for file in all_files:
        file['content'] = get_file_content(file['full_path'])
        all_files_with_content.append(file)

    with concurrent.futures.ThreadPoolExecutor(max_workers=None) as executor:
        futures_to_url = {executor.submit(
            post, file): file for file in all_files_with_content}


if __name__ == "__main__":
    main()
