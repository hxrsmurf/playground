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


def convert_title(file, root):
    # 01-02-2023 - Monday.md
    split_file = file.split(' ')[0]
    try:
        return datetime.datetime.strptime(split_file, "%m-%d-%Y").strftime('%Y-%m-%d')
    except:
        try:
            # 12_15_2021 - Unknown.md
            return datetime.datetime.strptime(split_file, "%m_%d_%Y").strftime('%Y-%m-%d')
        except:
            try:
                # 2019\01 - January\January 01 - Monday.md
                full_path = f'{root}\{file}'
                split_year = full_path.split('\\')
                for y in split_year:
                    if len(y) == 4:
                        year = y
                split_file = ' '.join(file.split(' ')[0:2]) + ' ' + year
                return datetime.datetime.strptime(split_file, "%B %d %Y").strftime('%Y-%m-%d')
            except:
                try:
                    # 2019\06 - June\June 01.md
                    full_path = f'{root}\{file}'
                    split_year = full_path.split('\\')
                    for y in split_year:
                        if len(y) == 4:
                            year = y
                    split_file = file.split('.')[0] + ' ' + year
                    return datetime.datetime.strptime(split_file, "%B %d %Y").strftime('%Y-%m-%d')
                except:
                    try:
                        # 2017\02 - February\February 1, 2017 - Wednesday.md
                        split_file = file.split(' - ')[0]
                        # February 10, 2017
                        return datetime.datetime.strptime(split_file, "%B %d, %Y").strftime('%Y-%m-%d')
                    except:
                        print(f'Convert Title Exception:', file, root, split_file)
        return None


def get_all_files():
    list_all_files = []

    with open('.env', 'r', encoding='utf-8') as file:
        json_file = json.load(file)

    for file in json_file:
        for root, dirs, files in os.walk(file['path']):
            for f in files:
                if "Year In Review" in root or "Music" in root or "Movies" in root or "Review" in f or ".png" in f:
                    continue

                if 'Overview' in root:
                    continue

                title = convert_title(f, root)
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
    try:
        with open(full_path, 'r', encoding="utf-8") as file:
            return file.read()
    except Exception as e:
        print('Read File error:', full_path, e)


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
