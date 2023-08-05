import sys

from importlib.resources import path
import os, io
from google.cloud import vision
from google.cloud import vision_v1
from google.cloud.vision_v1 import types
import pandas as pd
from google.oauth2 import service_account

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'APIKey.json'
credentials = service_account.Credentials.from_service_account_file('quranic_verses/search_quranic_verse/APIKey.json')

client = vision.ImageAnnotatorClient(credentials=credentials)


def detectText(img):
    content = img

    image = vision_v1.types.Image(content=content)
    response = client.text_detection(image=image)
    texts = response.text_annotations

    df = pd.DataFrame(columns=['locale','description'])
    for text in texts:
        df = pd.concat([df, 
            pd.DataFrame([dict(
                locale=text.locale,
                description = text.description
            )])],
            ignore_index= True
        )
    
    # return df, [response, texts]
    return df.description[0]

if __name__ == '__main__':
    try:
        arg = sys.argv[1]
    except IndexError:
        arg = None

    return_val = detectText(arg)

# FILE_NAME = 'surah fatiha ayah 1.png'
# FOLDER_PATH = r'C:\Users\sidra\Downloads\UoL\UoL final project\UoL Final project code\testing apis'

# final = detectText(os.path.join(FOLDER_PATH, FILE_NAME))
# print (final)