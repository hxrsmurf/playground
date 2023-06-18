import os
import datetime


def remove_extension(file):
    trim = file.split(' ')
    only_date = trim[0]
    formatted_date = datetime.datetime.strptime(
        only_date, "%m-%d-%Y").strftime('%Y-%m-%d')
    return formatted_date


def main():
    with open('.env', 'r') as file:
        for line in file:
            obsidian = line

    dirs = os.listdir(obsidian)
    markdown_files = []
    for file in dirs:
        if '.md' in file and not 'Huel' in file:
            markdown_files.append(file)

    all_content = []
    for markdown in markdown_files:
        path = obsidian + '\\' + markdown
        with open(path, 'r') as file:
            output = file.read()
            data = {
                'file': remove_extension(markdown),
                'content': output
            }
            all_content.append(data)


if __name__ == "__main__":
    main()
