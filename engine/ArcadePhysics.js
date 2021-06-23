(function() {
  'use strict'

  class ArcadePhysics {
    constructor() {
      this.objects = new Set
    }

    add(...objects) {
      objects.forEach(object => {
        this.objects.add(object)
      })
    }

    remove(...objects) {
      objects.forEach(object => {
        this.objects.delete(object)
      })
    }

    porocessing() {
      const objects = Array.from(this.objects)
      for (let i = 0; i < objects.length; i++) {
        const object1 = objects[i]
        const tops1 = object1.tops
        const velocity1 = object1.velocity
        
        for (let j = i + 1; j < objects.length; j++) {
          const object2 = objects[j]
          const tops2 = object2.tops
          const velocity2 = object2.velocity

          let flag = false
          tops1.forEach(top1 => {
            if (object2.isInside(top1[0] + velocity1.x, top1[1] + velocity1.y)) {
              flag = true
              return
            }
          })
          
          if (!flag) {
            tops2.forEach(top2 => {
              if (object1.isInside(top2[0] + velocity2.x, top2[1] + velocity2.y)) {
                flag = true
                return
              }
            })
          }
          if (flag) {
            object1.emit('collision', object1, object2)
            object2.emit('collision', object2, object1)
          }
        }
      }
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.ArcadePhysics = ArcadePhysics
})()