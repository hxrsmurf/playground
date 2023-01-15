def convert_to_h264(destination_file, folder):
    subprocess.run([
        'ffmpeg', '-i', destination_file, '-c:v', 'libx264', '-c:a', 'copy',
        f'{folder}/h264.mp4'
    ])

def convert_to_hls(destination_file, folder):
    subprocess.run([
        'ffmpeg', '-i', destination_file, '-c:v', 'libx264', '-c:a', 'copy',
        '-flags', '+cgop',
        '-g', '30',
        '-hls_time', '2',
        '-hls_playlist_type', 'event',
        f'{folder}/playlist.m3u8'
    ])