(function() {
  'use strict'

  class Container extends GameEngine.DisplayObject {
    constructor(args = {}) {
      super(args)
      this.objects = []
    }

    add(parent = null, ...objects) {
      objects.forEach(object => {
        if (!this.objects.includes(object)) {
          this.objects.push(object)
          object.parent = parent ? parent : this
        }
      })
    }

    changePosition(timestamp) {
      this.objects.forEach(object => {
        object.changePosition(timestamp)
      })
    }

    remove(...objects) {
      objects.forEach(object => {
        if (this.objects.includes(object)) {
          const index = this.objects.indexOf(object)
          this.objects.splice(index, 1)
          object.parent = null
        }
      })
    }

    draw(canvas, context) {
      super.draw(() => {
        // console.log(this.objects)
        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.rotation)
        context.scale(this.scaleX, this.scaleY)
        this.objects.forEach(item => item.draw(canvas, context))
        context.restore()
      })
    }

    get sprites() {
      return _getAllSprites(this.objects)
      function _getAllSprites(items, result = []) {
        items.forEach(item => {
          if (item instanceof GameEngine.Container) {
            _getAllSprites(item.objects, result)
          } else {
            result.push(item)
          }
        })   
        return result
      }
    }

  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Container = Container
})()