"use client"

import { useLoader } from "@react-three/fiber"
import { PLYLoader } from "three/examples/jsm/Addons.js"
import { useMemo } from "react"
import * as THREE from "three"

interface PLYModelProps {
  url: string
}

export function PLYModel({ url }: PLYModelProps) {
  const geometry = useLoader(PLYLoader, url)

  const { processedGeometry, hasVertexColors } = useMemo(() => {
    if (!geometry) return { processedGeometry: null, hasVertexColors: false }

    // Compute normals for proper lighting
    geometry.computeVertexNormals()
    geometry.center()

    // Scale the model to fit in view
    const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position as THREE.BufferAttribute)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2 / maxDim
    geometry.scale(scale, scale, scale)

    // Check if the geometry has vertex colors
    const hasColors = geometry.attributes.color !== undefined

    return {
      processedGeometry: geometry,
      hasVertexColors: hasColors,
    }
  }, [geometry])

  if (!processedGeometry) {
    return null
  }

  return (
    <mesh geometry={processedGeometry}>
      <meshStandardMaterial
        vertexColors={hasVertexColors}
        color={hasVertexColors ? "#ffffff" : "#8B5CF6"}
        roughness={0.3}
        metalness={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
