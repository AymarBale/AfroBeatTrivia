from pytube import YouTube 
from pydub import AudioSegment
import os 
"""# url input from user 
yt = YouTube( 
    str("https://www.youtube.com/watch?v=RjQ_i8Njols")) 
  
# extract only audio 
video = yt.streams.filter(only_audio=True).first() 
  
# check for destination to save file 
print("Enter the destination (leave blank for current directory)") 
destination = str("C:\\Users\\aymar\\Downloads\\MusicData") or '.'
  
# download the file 
out_file = video.download(output_path=destination) 
  
# save the file 
base, ext = os.path.splitext(out_file) 
new_file = base+'.mp3'
os.rename(out_file, new_file) 
  
# result of success 
print(yt.title + " has been successfully downloaded.")

  
# Open an mp3 file 
song = AudioSegment.from_file(base+".mp3", 
                              format="mp4") 
  
# start and end time 
start_min = 0
start_sec = 30
end_min =  0
end_sec = 40
  
# pydub does things in milliseconds, so convert time 
start = ((start_min*60)+start_sec)*1000
end = ((end_min*60)+end_sec)*1000
  
# song clip of 10 seconds from starting 
first_10_seconds = song[start: end] 
  
# save file 
first_10_seconds.export(base+".mp3", format="mp3") 
print("New Audio file is created and saved") """

import os

# Use the absolute path to the folder
folder_path = 'C:/Users/aymar/Downloads/AfroBeatTrivia/MusicData'

def get_file_names(folder_path):
    file_names = []
    for file_name in os.listdir(folder_path):
        if os.path.isfile(os.path.join(folder_path, file_name)):
            file_names.append(file_name)
    return file_names

file_names = get_file_names(folder_path)

print('File names in the folder:', file_names)