(function() {
  'strict'

  class DisplayObject {
    constructor(args = {}) {
      this.parent = null
      this.x = args.x || 0
      this.y = args.y || 0
      this.width = args.width || 0
      this.height = args.height || 0
      this.rotation = args.rotation || 0
      this.anchorX = args.anchorX || 0
      this.anchorY = args.anchorY || 0
      this.scale = args.scale || 1
      this.visible = true
    }

    set scale(value) {
      this.scaleX = value
      this.scaleY = value
    }

    draw(callback) {
      if (this.visible) {
        callback()
      }
    }
    
    get absoluteX() {
      return 0 - this.anchorX * this.width
    }

    set absoluteX(value) {
      this.x = value + this.anchorX * this.width
    }

    get absoluteY() {
      return 0 - this.anchorY * this.height
    }

    set absoluteY(value) {
      this.y = value + this.anchorY * this.height
    }

    setParent(parent) {
      if (this.parent) { 
        this.parent.remove(this)
      }
      this.parent.add(this)
    }

  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.DisplayObject = DisplayObject
})()