import os
from os.path import join, getsize
import datetime
import requests


def remove_extension(file):
    trim = file.split(' ')
    only_date = trim[0]
    formatted_date = datetime.datetime.strptime(
        only_date, "%m-%d-%Y").strftime('%Y-%m-%d')
    return formatted_date


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


def main():
    all_files = get_all_files()
    for file in all_files:
        print(file)
        break


if __name__ == "__main__":
    main()
