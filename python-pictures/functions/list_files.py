import os

def list_files(directory):
    list_of_pictures = []

    for root, subdirs, files in os.walk(directory):
        for file in files:
            if '.jpg' in file or '.png' in file or '.JPG' in file:
                full_path = root + '/' + file
                list_of_pictures.append(full_path)

    return list_of_pictures
