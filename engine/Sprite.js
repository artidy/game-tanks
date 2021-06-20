(function() {
  'use strict'

  class Sprite extends GameEngine.DisplayObject {
    constructor(texture, args = {}) {
      super({
        width: texture.width,
        height: texture.height,
        ...args
      })
      this.texture = texture
      this.frame = {
        x: 0,
        y: 0,
        width: texture.width,
        height: texture.height,
        ...args.frame
      }
    }

    draw(canvas, context) {
      super.draw(() => {
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
        context.restore()
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Sprite = Sprite
})()