(function() {
  'use strict'

  class Scene extends GameEngine.Container {
    constructor(args) {
      super()
      this.name = args.name || ''
      this.autoStart = args.autoStart || false
      this.timeExist = args.timeExist || 0
      this.stage = this.objects
      this.status = 'waiting'
      this.initFunction('loading', args)
      this.initFunction('init', args)
      this.initFunction('update', args) 
      this.initFunction('beforeDestroy', args)
    }

    initFunction(name, args) {
      if (args[name]) {
        this[name] = args[name].bind(this)
      } else {
        this[name] = this[name].bind(this) 
      }
    }

    loading() {}
    init() {}
    update() {}
    beforeDestroy() {
      Object.keys(this).forEach(key => {
        delete this[key]
      })
    }

  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Scene = Scene
})()