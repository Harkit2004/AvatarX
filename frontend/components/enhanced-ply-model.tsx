"use client"

import { useLoader } from "@react-three/fiber"
import { PLYLoader } from "three/examples/jsm/Addons.js"
import { useMemo } from "react"
import * as THREE from "three"

interface EnhancedPLYModelProps {
  url: string
  wireframe?: boolean
  showVertexColors?: boolean
}

export function EnhancedPLYModel({ url, wireframe = false, showVertexColors = true }: EnhancedPLYModelProps) {
  const geometry = useLoader(PLYLoader, url)

  const modelData = useMemo(() => {
    if (!geometry) return null

    // Compute normals for proper lighting
    geometry.computeVertexNormals()
    geometry.center()

    // Scale the model to fit in view
    const box = new THREE.Box3().setFromBufferAttribute(geometry.attributes.position as THREE.BufferAttribute)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2 / maxDim
    geometry.scale(scale, scale, scale)

    // Analyze color information
    const hasVertexColors = geometry.attributes.color !== undefined
    const hasNormals = geometry.attributes.normal !== undefined
    const vertexCount = geometry.attributes.position.count

    // If we have vertex colors, ensure they're properly formatted
    if (hasVertexColors && geometry.attributes.color) {
      const colors = geometry.attributes.color

      // Ensure colors are in the right format (0-1 range)
      if (colors.array instanceof Uint8Array) {
        // Convert from 0-255 to 0-1 range
        const normalizedColors = new Float32Array(colors.array.length)
        for (let i = 0; i < colors.array.length; i++) {
          normalizedColors[i] = colors.array[i] / 255
        }
        geometry.setAttribute("color", new THREE.BufferAttribute(normalizedColors, colors.itemSize))
      }
    }

    return {
      geometry,
      hasVertexColors,
      hasNormals,
      vertexCount,
      boundingBox: box,
      size,
    }
  }, [geometry])

  if (!modelData) {
    return null
  }

  const { geometry: processedGeometry, hasVertexColors } = modelData

  return (
    <group>
      <mesh geometry={processedGeometry}>
        <meshStandardMaterial
          vertexColors={hasVertexColors && showVertexColors}
          color={hasVertexColors && showVertexColors ? "#ffffff" : "#8B5CF6"}
          roughness={0.4}
          metalness={0.1}
          side={THREE.DoubleSide}
          wireframe={wireframe}
          transparent={wireframe}
          opacity={wireframe ? 0.8 : 1.0}
        />
      </mesh>

      {/* Optional wireframe overlay */}
      {!wireframe && hasVertexColors && (
        <mesh geometry={processedGeometry}>
          <meshBasicMaterial color="#000000" wireframe={true} transparent={true} opacity={0.1} />
        </mesh>
      )}
    </group>
  )
}
