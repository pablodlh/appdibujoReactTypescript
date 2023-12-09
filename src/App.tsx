/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useEffect, useCallback, useState } from 'react'

function App (): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  let initialX: number | null = null
  let initialY: number | null = null

  const draw = useCallback((context: CanvasRenderingContext2D, cursorX: number, cursorY: number): void => {
    if (initialX === null || initialY === null) {
      initialX = cursorX
      initialY = cursorY
    }
    context.beginPath()
    context.moveTo(initialX, initialY)
    context.lineWidth = 20
    context.strokeStyle = '#400'
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineTo(cursorX, cursorY)
    context.stroke()
    initialX = cursorX
    initialY = cursorY
  }, [])

  const mouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
    setIsDrawing(true)
  }, [])

  const mouseMoving = useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    draw(context, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }, [draw, isDrawing])

  const mouseUp = useCallback((): void => {
    setIsDrawing(false)
    initialX = null
    initialY = null
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current!
    canvas.width = 900
    canvas.height = 900
  }, [])

  return (
    <main className='bg-[#212121] h-screen flex justify-center items-center'>
      <canvas
        ref={canvasRef}
        id="canvasPrincipal"
        className='w-[900px] bg-white h-[900px]'
        onMouseMove={mouseMoving}
        onMouseDown={mouseDown}
        onMouseUp={mouseUp}
        data-testid="canvas"
      ></canvas>
    </main>
  )
}

export default App
