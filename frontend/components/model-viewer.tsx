"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { Suspense, useEffect, useState } from "react"
import { PLYModel } from "./ply-model"

interface ModelViewerProps {
  modelUrl: string
}

export function ModelViewer({ modelUrl }: ModelViewerProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-64 border rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading 3D viewer...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-64 border rounded-lg overflow-hidden bg-gray-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <PLYModel url={modelUrl} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  )
}
