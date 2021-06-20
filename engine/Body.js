(function() {

  class Body extends GameEngine.Sprite {
    constructor(texture, args) {
      super(texture, args)
      this.body = {
        x: 0,
        y: 0,
        width: 1,
        height: 1,
        debug: false,
        ...args.body
      }
    }

    draw(canvas, context) {
      if (!this.visible) {
        return
      }
      context.save()
      context.translate(this.x, this.y)
      context.rotate(this.rotation)
      context.scale(this.scaleX, this.scaleY)
      context.drawImage(
        this.texture,
        this.frame.x,
        this.frame.y,
        this.frame.width,
        this.frame.height,
        this.absoluteX,
        this.absoluteY,
        this.width,
        this.height
      )

      if (this.body.debug) {
        const scale = (this.scaleX + this.scaleY) / 2
        const sizePoint = 4 / scale
        const sizeRectX = this.width
        const sizeRectY = this.height
        const absoluteX = 0 - this.anchorX * sizeRectX
        const absoluteY = 0 - this.anchorY * sizeRectY
        context.fillStyle = 'red'
        context.strokeStyle = 'red'

        context.beginPath()
        context.arc(this.body.x, this.body.y, sizePoint, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.lineWidth = 10
        context.rect(
          absoluteX, 
          absoluteY, 
          sizeRectX, 
          sizeRectY, 
          Math.PI * 2
        )
        context.stroke()
      }

      context.restore()
    }
  }

  window.GameEngine = window.GameEngine || {} 
  window.GameEngine.Body = Body
})()