import os


def main():
    with open('.env', 'r') as file:
        for line in file:
            obsidian = line

    dirs = os.listdir(obsidian)
    markdown_files = []
    for file in dirs:
        if '.md' in file and not 'Huel' in file:
            markdown_files.append(file)

    for markdown in markdown_files:
        path = obsidian + '\\' + markdown
        with open(path, 'r') as file:
            output = file.read()
            print({
                'file': markdown,
                'content': output
            })
            break


if __name__ == "__main__":
    main()
