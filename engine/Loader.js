(function() {
  'use strict'

  class Loader {
    constructor() {
      this.register = {
        images: [],
        jsons: []
      }
      this.resources = {
        images: {},
        jsons: {}
      }
    }

    addImage(name, src) {
      this.register.images.push({name, src})
    }

    addJson(name, src) {
      this.register.jsons.push({name, src})
    }

    getImage(name) {
      return this.resources.images[name]
    }

    getJson(name) {
      return this.resources.jsons[name]
    }

    load(callback) {
      const promises = []
      this.register.images.forEach(loadImage => {
        const {name, src} = loadImage
        const promise = Loader
          .loadImage(src)
          .then(image => {
            this.resources.images[name] = image
            if (this.register.images.includes(loadImage)) {
              const index = this.register.images.indexOf(name)
              this.register.images.splice(index, 1)
            }
          })
          promises.push(promise)
      })

      this.register.jsons.forEach(jsonLoad => {
        const {name, src} = jsonLoad
        const promise = Loader
          .loadJson(src)
          .then(json => {
            this.resources.jsons[name] = json
            if (this.register.jsons.includes(jsonLoad)) {
              const index = this.register.jsons.indexOf(name)
              this.register.jsons.splice(index, 1)
            }
          })
        promises.push(promise)
      })
      Promise.all(promises).then(callback)
    }

    static loadImage(src) {
      return new Promise((resolve, reject) => {
        try {
          const image = new Image
          image.onload = () => resolve(image)
          image.src = src
        } catch(err) {
          reject(err)
        }
      })
    }

    static loadJson(src) {
      return new Promise((resolve, reject) => {
        fetch(src)
          .then(result => result.json())
          .then(json => resolve(json))
          .catch(err => reject(err))
      })
    }
  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Loader = Loader

})()