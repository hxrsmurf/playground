import os

def list_files(directory):
    list_of_files = {}

    for root, subdirs, files in os.walk(directory):
        folder_files = []

        path = root.split(os.sep)
        full_path = '/'.join(path)
        folder = full_path.split(f'{directory}')[1]
        subfolder = (folder.split('/'))[0]

        for file in files:
            try:
                extension = file.split('.')[1]
                if extension == 'jpg' or extension == 'JPG' or extension == 'png' or extension == 'PNG':
                    folder_files.append({
                        'full_path': full_path,
                        'folder': folder,
                        'subfolder': subfolder,
                        'file': file
                    })
            except Exception as e:
                print(full_path, file, e)
                pass
        list_of_files[folder] = folder_files

    return list_of_files