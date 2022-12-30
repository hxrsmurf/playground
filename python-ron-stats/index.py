from datetime import datetime
from pynput import mouse

current = datetime.now().strftime('%Y-%m-%d-%H-%S-%f')
filename = f'{current}.txt'

def write(log):
    timestamp = datetime.now().strftime('%Y-%m-%d-%H-%S-%f')
    file = open(filename, 'a')
    file.write('\n')
    file.write(f'{timestamp} - {log}')

def on_click(x, y, button, pressed):
    log = f'{x}, {y}, {button}'
    write(log)
    print(log)

# Collect events until released
with mouse.Listener(on_click=on_click) as listener:
    listener.join()