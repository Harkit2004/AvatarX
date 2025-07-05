export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    const backendFormData = new FormData()
    backendFormData.append("file", file)

    const response = await fetch(`${ process.env.BACKEND_URL }upload-image/`, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error("Failed to generate 3D model from image")
    }

    const blob = await response.blob()

    return new Response(blob, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="model.ply"',
      },
    })
  } catch (error) {
    return Response.json({ error: "Failed to generate 3D model from image" }, { status: 500 })
  }
}
