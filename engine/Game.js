(function() {
  'use strict'
  
  class Game {
    constructor(args) {
      this.renderer = new GameEngine.Renderer(args)
      this.loader = new GameEngine.Loader()
      this.controller = new GameEngine.Controller()
      this.scenes = new GameEngine.Container()
      this.scenes.add(this, ...args.scenes)
      if (args.el && args.el.append) {
        args.el.append(this.renderer.canvas)
      }
      this.init()
    }

    init() {
      this.autoStartScenes.forEach(scene => {
        scene.status = 'loading'
        scene.loading(this.loader)
      })
      this.loader.load(() => {
        this.autoStartScenes.forEach(scene => {
          scene.status = 'init'
          scene.init(this.loader)
          scene.status = 'loading'
        })
        this.autoStartScenes.forEach(scene => {
          scene.status = 'started'
        })
      })

      requestAnimationFrame(timestamp => this.tick(timestamp))
    }

    get autoStartScenes() {
      return this.scenes.objects.filter(scene => scene.autoStart)
    }

    get currentScenes() {
      return this.scenes.objects.filter(scene => scene.status === 'started')
    }

    tick(timestamp) {
      // this.renderer.update(timestamp)
      this.currentScenes.forEach(scene => {
        if (scene.status === 'started') {
          scene.update(timestamp)
        }
      })

      this.renderer.clear()
      this.currentScenes.forEach(scene => {
        scene.draw(this.renderer.canvas, this.renderer.context)
      })
      requestAnimationFrame(timestamp => this.tick(timestamp))  
    }

    startScene(scene) {
      const currentScene = this.getScene(scene)
      if (!currentScene) {
        return false
      }
      currentScene.status = 'loading'
      currentScene.loading(this.loader)
      this.loader.load(() => {
        currentScene.status = 'init'
        currentScene.init(this.loader)
        currentScene.status = 'started'
        return true
      })
    }

    finishScene(scene) {
      const currentScene = this.getScene(scene)
      if (!currentScene) {
        return false
      }
      
      currentScene.status = 'finished'
      this.scenes.remove(this)
      currentScene.beforeDestroy()
    }

    getScene(scene) {
      let result = null
      if (typeof scene === 'string') {
        result = this.scenes.objects.find(item => item.name === scene)
      } else if (scene instanceof GameEngine.Scene &&
        this.scenes.objects.includes(scene)) {
          result = scene     
      }
      return result      
    }

  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Game = Game
})()