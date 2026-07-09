'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

interface ChromaKeyVideoProps {
  src: string
  className?: string
  /** Ab diesem Mindestwert (0–255) im hellsten Kanal beginnt die Transparenz-Abstufung */
  low?: number
  /** Ab diesem Wert ist ein Pixel vollständig transparent */
  high?: number
}

/**
 * Spielt ein Video auf einem Canvas ab und blendet nahezu weiße Hintergrundpixel live
 * in echte Transparenz über (weicher Verlauf statt harter Kante). Nötig, weil MP4/H.264
 * im Browser keinen Alpha-Kanal unterstützt — dies ist der Ersatz dafür.
 */
export default function ChromaKeyVideo({ src, className = '', low = 205, high = 250 }: ChromaKeyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    let raf = 0
    let cancelled = false

    function paint() {
      if (cancelled || !video || !canvas || !ctx) return
      if (video.videoWidth && video.videoHeight) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
        }
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = frame.data
        for (let i = 0; i < data.length; i += 4) {
          const minChannel = Math.min(data[i], data[i + 1], data[i + 2])
          if (minChannel > low) {
            const fade = Math.min(1, (minChannel - low) / (high - low))
            data[i + 3] = Math.round(data[i + 3] * (1 - fade))
          }
        }
        ctx.putImageData(frame, 0, 0)
      }
      if (!reduced) {
        raf = requestAnimationFrame(paint)
      }
    }

    function handleLoadedData() {
      if (!video) return
      if (reduced) {
        video.currentTime = video.duration ? video.duration / 2 : 0
      } else {
        video.play().catch(() => {})
        raf = requestAnimationFrame(paint)
      }
    }

    function handleSeeked() {
      if (reduced) paint()
    }

    video.muted = true
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('seeked', handleSeeked)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [reduced, low, high])

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        loop={!reduced}
        preload="auto"
        className="hidden"
      />
      <canvas ref={canvasRef} className="h-full w-full object-contain" />
    </div>
  )
}
