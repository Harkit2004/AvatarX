export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    console.log(prompt)

    const response = await fetch(`${ process.env.BACKEND_URL }generate-3d-model/${ prompt }`, {
      method: "POST",
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
