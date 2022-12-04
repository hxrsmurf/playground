import os

def list_files(directory):
    list_of_pictures = {}

    for root, subdirs, files in os.walk(directory):
        for subdir in subdirs:
            subdir_pictures = []

            for file in files:
                extension = file.split('.')[1]
                if extension == 'jpg' or extension == 'JPG' or extension == 'png' or extension == 'PNG':

                    full_path = root + '/' + subdir + '/' + file
                    split_subdir = full_path.split(directory)[1]
                    split_path = split_subdir.split(file)[0]
                    parent_subdir = split_path.split('/')[0]

                    if not parent_subdir:
                        parent_subdir = split_path.split('/')[1]

                    subdir_pictures.append({
                        'full_path': full_path,
                        'split_subdir': split_path,
                        'parent_subdir': parent_subdir,
                        'subdir': subdir,
                        'file': file
                    })

            list_of_pictures[parent_subdir] = subdir_pictures

    return list_of_pictures