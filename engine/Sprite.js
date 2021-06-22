(function() {
  'use strict'

  class Sprite extends GameEngine.DisplayObject {
    constructor(texture, args) {
      super({
        width: texture.width,
        height: texture.height,
        ...args
      })
      this.texture = texture

      this.frames = []
      this.frameNumber = 0
      this.frameDelay = 0

      this.animations = {}
      this.currentAnimation = ''

      this.velocity = {
        x: 0,
        y: 0,
        ...args.velocity
      }
      this.frame = {
        x: 0,
        y: 0,
        width: texture.width,
        height: texture.height,
        ...args.frame
      }
    }

    changePosition(timestamp) {
      if (Util.delay(this.currentAnimation && 
                    this.currentAnimation + this.uid, 
                    this.frameDelay)) {
        const {frames} = this.animations[this.currentAnimation]
        this.frameNumber = (this.frameNumber + 1) % frames.length
        this.setFrame(...frames[this.frameNumber])
      }
      this.x += this.velocity.x
      this.y += this.velocity.y
    }

    setFrameCollection(frames) {
      this.frames = frames
    }

    setAnimationsCollection(animations) {
      this.animations = animations
    }

    startAnimation(animationName) {
      if (!this.animations.hasOwnProperty(animationName)) {
        return false
      }
      this.currentAnimation = animationName
      const {duration, frames} = this.animations[this.currentAnimation]
      this.frameDelay = duration / frames.length
      this.setFrame(...frames[0])
    }

    setFrame(...keys) {
      const frame = this.getFrame(...keys)
      
      if (!frame) {
        return false
      }
      this.frame = {
        ...this.frame,
        ...frame
      }

      this.width = this.frame.width
      this.height = this.frame.height
    }

    getFrame(...keys) {
      let flag = false
      return this.frames.find(frame => {
        flag = true
        keys.forEach(key => {
          if (!frame.keys.includes(key)) {
            flag = false
            return
          }
        })
        if (flag) {
          return JSON.parse(JSON.stringify(frame))
        }
      })
     
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