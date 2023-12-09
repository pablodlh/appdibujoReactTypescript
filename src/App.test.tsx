import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renderiza bien', () => {
    const { getByTestId } = render(<App />)
    const canvas = getByTestId('canvas')
    expect(canvas).toBeDefined()
  })

  it('reacciona bien al mousedown y mouseup', () => {
    const { getByTestId } = render(<App />)
    const canvas = getByTestId('canvas')

    fireEvent.mouseDown(canvas)
    fireEvent.mouseUp(canvas)
  })
})
