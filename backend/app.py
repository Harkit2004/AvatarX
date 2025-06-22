import os
import uuid
from dotenv import load_dotenv
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from gemini_utils import give_human_description
from shap_e_utils import generate_3d_model_from_prompt, generate_3d_model_from_image

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=True,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory to save uploaded images
UPLOAD_DIR = "uploads"

@app.post("/upload-human-image/")
async def upload_human_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded image
        file_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.{file.filename.split('.')[-1]}")
        with open(file_path, "wb") as f:
            f.write(await file.read())
        prompt = await give_human_description(file_path)
        if prompt == "not a human":
            return JSONResponse(content={"message": "The uploaded image is not a human."}, status_code=200)
        else:
            file_path_3d = await generate_3d_model_from_prompt(prompt)
            return FileResponse(file_path_3d, media_type="application/octet-stream", filename=os.path.basename(file_path_3d))
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
@app.post("/upload-image/")
async def upload_image(file: UploadFile = File(...)):
    try:
        # Save the uploaded image
        file_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.{file.filename.split('.')[-1]}")
        with open(file_path, "wb") as f:
            f.write(await file.read())
        file_path_3d = await generate_3d_model_from_image(file_path)
        return FileResponse(file_path_3d, media_type="application/octet-stream", filename=os.path.basename(file_path_3d))
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    
@app.post("/generate-3d-model/")
async def generate_3d_model(request: str):
    try:
        file_path_3d = await generate_3d_model_from_prompt(request)
        return FileResponse(file_path_3d, media_type="application/octet-stream", filename=os.path.basename(file_path_3d))
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)