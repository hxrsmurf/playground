from PIL import Image
import io


def show_image_blob(blob):
    binary_file = io.BytesIO(blob)
    Image.open(binary_file).show()


def get_binary(file):
    binary_file = open(file, "rb").read()
    return binary_file
