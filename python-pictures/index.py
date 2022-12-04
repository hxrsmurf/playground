import os

directory = 'C:/Users/kvchm/Pictures/pictures/Ollie'

for root, subdirs, files in os.walk(directory):
    for file in files:
        full_path = root + '/' + file
        print(full_path)