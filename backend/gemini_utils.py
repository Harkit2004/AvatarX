from dotenv import load_dotenv
import os
from google import genai
from google.genai import types

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_KEY"),
)

async def give_human_description(file_path: str):
    model = "gemma-3-27b-it"
    contents = None
    with open(file_path, "rb") as f:
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_bytes(
                        mime_type="image/jpeg",
                        data=f.read(),
                    ),
                    types.Part.from_text(text="""Figure out if the image is of a human or not. If it is, give a small description of about 20 characters starting with "a human with" and followed about their appearance, including type of clothing, hair length and color, and any other notable features. If it is not a human, just say "not a human", nothing else."""),
                ],
            ),
        ]
    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
    )

    response = ""

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response += str(chunk.text)
    
    return response.strip()

async def give_description(file_path: str):
    model = "gemma-3-27b-it"
    contents = None
    with open(file_path, "rb") as f:
        contents = [
            types.Content(
                role="user",
                parts=[
                    types.Part.from_bytes(
                        mime_type="image/jpeg",
                        data=f.read(),
                    ),
                    types.Part.from_text(text="""Describe the image in no more than 25 characters considering only main details. Do not include any information about the image itself, such as the type of image or the fact that it is an image. Just describe the main details of the image."""),
                ],
            ),
        ]

    generate_content_config = types.GenerateContentConfig(
        response_mime_type="text/plain",
    )

    response = ""

    for chunk in client.models.generate_content_stream(
        model=model,
        contents=contents,
        config=generate_content_config,
    ):
        response += str(chunk.text)
    
    return response.strip()