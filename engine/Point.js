(function() {
  'use strict'

  class Point extends GameEngine.DisplayObject {
    constructor(args) {
      super()
      this.color = args.color || 'red' 
      this.x = args.x || 0
      this.y = args.y || 0  
    }

    draw(canvas, context) {
      super.draw(() => {
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, 5, 0, Math.PI * 2)
        context.fill()
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Point = Point
})()