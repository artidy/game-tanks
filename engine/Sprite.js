(function() {
  'use strict'

  class Sprite {
    constructor(texture, args = {}) {
      this.texture = texture
      this.frame = {
        x: 0,
        y: 0,
        width: texture.width,
        height: texture.height,
        ...args.frame
      }
      this.x = args.x || 0
      this.y = args.y || 0
      this.width = args.width || this.frame.width
      this.height = args.height || this.frame.height
      this.anchorX = args.anchorX || 0
      this.anchorY = args.anchorY || 0
    }

    get scaleX() {
      return this.width / this.frame.width
    }

    set scaleX(value) {
      this.width = this.frame.height * value
    }

    get scaleY() {
      return this.height / this.frame.height
    }

    set scaleY(value) {
      this.height = this.frame.height * value
    }

    set scale(value) {
      this.scaleX = value
      this.scaleY = value
    }

    get absoluteX() {
      return this.x - this.anchorX * this.width
    }

    set absoluteX(value) {
      this.x = value + this.anchorX * this.width
    }

    get absoluteY() {
      return this.y - this.anchorY * this.height
    }

    set absoluteY(value) {
      this.y = value + this.anchorY * this.height
    }

    draw(canvas, context) {
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
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Sprite = Sprite
})()