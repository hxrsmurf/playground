import os

def list_files(path, search):
    _list_files = []
    for root, sub, folder in os.walk(path):
        if search in root:
            for file in folder:
                _list_files.append(
                    {
                        'root': root,
                        'file': file
                    }
                )

    return _list_files