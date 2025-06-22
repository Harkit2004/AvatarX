export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    const response = await fetch("http://localhost:8000/generate-3d-model/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(prompt),
    })

    if (!response.ok) {
      throw new Error("Failed to generate 3D model")
    }

    const blob = await response.blob()

    return new Response(blob, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": 'attachment; filename="model.ply"',
      },
    })
  } catch (error) {
    return Response.json({ error: "Failed to generate 3D model" }, { status: 500 })
  }
}
