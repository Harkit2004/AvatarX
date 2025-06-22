"use client"
import { PLYLoader } from "three/examples/jsm/Addons.js"
import { useEffect, useState, useMemo } from "react"
import type * as THREE from "three"
import { Canvas } from "@react-three/fiber"

interface PLYModelProps {
  url: string
}

function PlyMesh({ geometry }: { geometry: THREE.BufferGeometry }) {
  const material = useMemo(
    () => new (require("three").MeshStandardMaterial)({ color: "#8B5CF6" }),
    []
  )
  return <mesh geometry={geometry} material={material} />
}

export function PLYModel({ url }: PLYModelProps) {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null)

  useEffect(() => {
    const loader = new PLYLoader()
    loader.load(
      url,
      (loadedGeometry) => {
        loadedGeometry.computeVertexNormals()
        loadedGeometry.center()
        setGeometry(loadedGeometry)
      },
      undefined,
      (error) => {
        console.error("Error loading PLY file:", error)
      },
    )
  }, [url])

  if (!geometry) {
    return null
  }

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <PlyMesh geometry={geometry} />
    </Canvas>
  )
}
