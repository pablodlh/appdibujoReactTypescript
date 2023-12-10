/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useEffect, useCallback, useState } from 'react'

const SvgBackground = (): any => (
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
    viewBox="0 0 280 280">
    <g>
      <path style={{ fill: '#26A6D1' }} d="M183.679,4.634l91.683,91.683c6.178,6.178,6.178,16.207,0,22.385L118.695,275.359
        c-6.178,6.187-16.207,6.187-22.385,0L4.637,183.676c-6.178-6.178-6.178-16.198,0-22.376L161.295,4.634
        C167.482-1.545,177.501-1.545,183.679,4.634z"/>
      <path style={{ fill: '#E2574C' }} d="M84.34,81.597L4.637,161.3c-6.178,6.178-6.178,16.198,0,22.376l91.683,91.683
        c6.178,6.187,16.207,6.187,22.385,0l79.703-79.694L84.34,81.597z"/>
      <path style={{ fill: '#CB4E44' }} d="M40.585,125.352L4.637,161.3c-6.178,6.178-6.178,16.198,0,22.376l91.683,91.683
        c6.178,6.187,16.207,6.187,22.385,0l35.949-35.94L40.585,125.352z"/>
      <path style={{ fill: '#EAE5E4' }} d="M20.416,145.548l114.041,114.041l-10.555,10.555L9.861,156.103L20.416,145.548z"/>
    </g>
  </svg>
)

function App (): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('black')
  const [initial, setInitial] = useState<{ x: number | null, y: number | null }>({ x: null, y: null })

  const draw = useCallback((context: CanvasRenderingContext2D, cursorX: number, cursorY: number): void => {
    if (initial.x != null || initial.y != null) {
      setInitial({ x: cursorX, y: cursorY })
    }
    context.beginPath()
    context.moveTo(initial.x ?? cursorX, initial.y ?? cursorY)
    context.lineWidth = 20
    context.strokeStyle = color
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineTo(cursorX, cursorY)
    context.stroke()
    setInitial({ x: cursorX, y: cursorY })
  }, [color, initial])

  const mouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    setIsDrawing(true)
    draw(context, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }, [draw])

  const mouseUp = useCallback((): void => {
    setIsDrawing(false)
    setInitial({ x: null, y: null })
  }, [])

  const mouseMoving = useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) return
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    draw(context, e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }, [draw, isDrawing])

  const resetCanvas = useCallback((): void => {
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    context.clearRect(0, 0, canvas.width, canvas.height)
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
      <aside className='flex flex-row'>
        <button className='bg-red-400 text-white border ' onClick={resetCanvas}>Borrar</button>
        <section className='flex'>
          <div className={`bg-[black] w-7 h-7 rounded-full cursor-pointer ${color === 'black' ? 'border-2 border-white' : ''}`} onClick={() => { setColor('black') }}/>
          <div className={`bg-[red] w-7 h-7 rounded-full cursor-pointer ${color === 'red' ? 'border-2 border-white' : ''}`} onClick={() => { setColor('red') }}/>
          <div className={`bg-[yellow] w-7 h-7 rounded-full cursor-pointer ${color === 'yellow' ? 'border-2 border-white' : ''}`} onClick={() => { setColor('yellow') }}/>
          <div className={`bg-[blue] w-7 h-7 rounded-full cursor-pointer ${color === 'blue' ? 'border-2 border-white' : ''}`} onClick={() => { setColor('blue') }}/>
          <div className={`bg-[green] w-7 h-7 rounded-full cursor-pointer ${color === 'green' ? 'border-2 border-white' : ''}`} onClick={() => { setColor('green') }}/>
          <div className={`eraser w-7 h-7 rounded-full cursor-pointer ${color === 'white' ? 'border-2  border-white' : ''}`} onClick={() => { setColor('white') }}>
  <SvgBackground />
</div>
        </section>
      </aside>
    </main>
  )
}

export default App
