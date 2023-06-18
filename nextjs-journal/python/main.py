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


def get_all_files():
    list_all_files = []

    with open('.env', 'r') as file:
        for line in file:
            obsidian = line

    for root, dirs, files in os.walk(obsidian):
        for file in files:
            list_all_files.append(f'{root}\{file}')

    return list_all_files

def main():
    all_files = get_all_files()


if __name__ == "__main__":
    main()
