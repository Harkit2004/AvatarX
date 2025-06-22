"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Stats } from "@react-three/drei"
import { Suspense, useEffect, useState } from "react"
import { EnhancedPLYModel } from "./enhanced-ply-model"
import { Button } from "@/components/ui/button"
import { Eye, Grid3X3, Palette } from "lucide-react"

interface AdvancedModelViewerProps {
  modelUrl: string
  showControls?: boolean
}

export function AdvancedModelViewer({ modelUrl, showControls = true }: AdvancedModelViewerProps) {
  const [mounted, setMounted] = useState(false)
  const [wireframe, setWireframe] = useState(false)
  const [showVertexColors, setShowVertexColors] = useState(true)
  const [showStats, setShowStats] = useState(false)

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
    <div className="w-full">
      {showControls && (
        <div className="flex gap-2 mb-2">
          <Button
            variant={showVertexColors ? "default" : "outline"}
            size="sm"
            onClick={() => setShowVertexColors(!showVertexColors)}
          >
            <Palette className="w-4 h-4 mr-1" />
            Colors
          </Button>
          <Button variant={wireframe ? "default" : "outline"} size="sm" onClick={() => setWireframe(!wireframe)}>
            <Grid3X3 className="w-4 h-4 mr-1" />
            Wireframe
          </Button>
          <Button variant={showStats ? "default" : "outline"} size="sm" onClick={() => setShowStats(!showStats)}>
            <Eye className="w-4 h-4 mr-1" />
            Stats
          </Button>
        </div>
      )}

      <div className="w-full h-64 border rounded-lg overflow-hidden bg-gray-900 relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} />
            <directionalLight position={[-10, -10, -5]} intensity={0.3} />
            <EnhancedPLYModel url={modelUrl} wireframe={wireframe} showVertexColors={showVertexColors} />
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
            {showStats && <Stats />}
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}
