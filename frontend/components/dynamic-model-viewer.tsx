"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { ErrorBoundary } from "./error-boundary"

const AdvancedModelViewer = dynamic(
  () => import("./advanced-model-viewer").then((mod) => ({ default: mod.AdvancedModelViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-64 border rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white animate-pulse">Loading 3D viewer...</div>
      </div>
    ),
  },
)

interface DynamicModelViewerProps {
  modelUrl: string
  showControls?: boolean
}

export function DynamicModelViewer({ modelUrl, showControls = true }: DynamicModelViewerProps) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="w-full h-64 border rounded-lg overflow-hidden bg-gray-900 flex items-center justify-center">
            <div className="text-white">Preparing 3D model...</div>
          </div>
        }
      >
        <AdvancedModelViewer modelUrl={modelUrl} showControls={showControls} />
      </Suspense>
    </ErrorBoundary>
  )
}
