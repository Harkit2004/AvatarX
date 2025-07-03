import torch
from diffusers import ShapEPipeline
from diffusers.utils.export_utils import export_to_obj
from gemini_utils import give_description
import uuid

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

pipe = ShapEPipeline.from_pretrained("openai/shap-e", torch_dtype=torch.float16)
pipe = pipe.to(device)

guidance_scale = 15.0

# return a 3D model in OBJ format file path
async def generate_3d_model_from_prompt(request: str) -> str:
    prompt = [request]
    images = pipe(
        prompt,
        guidance_scale=guidance_scale,
        num_inference_steps=64,
        frame_size=256,
        output_type="mesh"
    ).images
    obj_path = export_to_obj(images[0], f"3dmodels/{uuid.uuid4()}.obj")
    return obj_path

async def generate_3d_model_from_image(file_path: str) -> str:
    prompt = await give_description(file_path)
    images = pipe(
        prompt,
        guidance_scale=guidance_scale,
        num_inference_steps=64,
        frame_size=256,
        output_type="mesh"
    ).images
    obj_path = export_to_obj(images[0], f"3dmodels/{uuid.uuid4()}.obj")
    return obj_path