from datetime import datetime
from pynput import mouse, keyboard
import logging

logging.basicConfig(level=logging.DEBUG)

current = datetime.now().strftime('%Y-%m-%d-%H-%S-%f')
filename = f'{current}.txt'

def write(log):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%S:%f')
    file = open(filename, 'a')
    file.write('\n')
    file.write(f'{timestamp} - {log}')

def on_click(x, y, button, pressed):
    if pressed:
        log = f'{x}, {y}, {button}'
        write(log)
        logging.info(log)

def on_press(key):
    log = f'{key}'
    write(log)
    logging.info(log)

def on_release(key):
    if key == keyboard.Key.esc:
        return False

mouse_listener = mouse.Listener(on_click=on_click)

with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    mouse_listener.start()
    listener.join()