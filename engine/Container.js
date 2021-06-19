(function() {
  'use strict'

  class Container {
    constructor() {
      this.objects = []
    }

    add(sprite) {
      if (!this.objects.includes(sprite)) {
        this.objects.push(sprite)
      }
    }

    remove() {}

    draw(canvas, context) {
      this.sprites.forEach(sprite => sprite.draw(canvas, context))
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