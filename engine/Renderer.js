(function() {
  'use strict'

  class Renderer {
    constructor(styles = {}, update) {
      this.canvas = document.createElement('canvas')
      this.context = this.canvas.getContext('2d')
      this.styles = styles
      this.update = update || (() => {})
      this.stage = new GameEngine.Container()
      this.init()
    }

    init() {
      this.styles = 
      { 
        width: 50, 
        height: 50,
        background: 'green',
        ...this.styles
      }
      Object.keys(this.styles).forEach(key => {
        this.canvas[key] = this.styles[key]
      })
    }

    render() {
      this.stage.draw(this.canvas, this.context)
    }

    get sprites() {
      return this.stage.sprites
    }

    clear() {
      this.context.fillStyle = this.canvas.background
      this.context.beginPath()
      this.context.rect(0, 0, this.canvas.width, this.canvas.height)
      this.context.fill()
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Renderer = Renderer
})()