import os
from os.path import join, getsize
import datetime
import requests


def post(data):
    headers = {
        'authorization': 'meow'
    }

    for d in data:
        date = d['file']
        content = d['content']
        response = requests.post(
            'http://localhost:3000/api/journal', json=d, headers=headers)
        print(response)


def convert_title(file):
    # 01-02-2023 - Monday.md
    split_file = file.split(' ')[0]
    try:
        return datetime.datetime.strptime(split_file, "%m-%d-%Y").strftime('%Y-%m-%d')
    except:
        return None


def get_all_files():
    list_all_files = []

    with open('.env', 'r') as file:
        for line in file:
            obsidian = line

    for root, dirs, files in os.walk(obsidian):
        for file in files:
            title = convert_title(file)
            if title:
                list_all_files.append({
                    'full_path': f'{root}\{file}',
                    'root': root,
                    'file': file,
                    'title': title
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
        break

    print(all_files_with_content)


if __name__ == "__main__":
    main()
