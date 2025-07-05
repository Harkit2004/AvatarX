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
                    types.Part.from_text(text="""
                        As an expert in image analysis, identify whether the provided image depicts a human. 
                        If it is a human, provide a very short and highly generic description starting with "a human in T-pose," 
                        followed by a very generic and brief note on their clothing type, hair type and color, and any notable features. 
                        Keep the description minimal and avoid specific details. 
                        If the image does not depict a human, respond only with "not a human".
                    """),
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