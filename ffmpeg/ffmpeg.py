import os
import subprocess

from functions.utils import list_files
from functions.convert import convert_to_hls, convert_to_h264

my_path = '/tmp/'

video_files = list_files(my_path, 'Mayor')

for video in video_files:
    root = video['root']
    file = video['file']
    folder = file.split('.mkv')[0]

    source_file = f'{root}/{file}'
    destination_file = f'{folder}/{file}'

    if 'example' in file:
        if not os.path.exists(folder):
            os.mkdir(folder)

        if os.path.exists(destination_file):
            print(f'Already copied: {file}')
        else:
            # Copy
            subprocess.run(['cp', f'{source_file}', f'{destination_file}'])
