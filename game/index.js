const {Game, Scene, Body, Point, Line} = GameEngine

const mainScene = new Scene({
  name: 'mainScene',
  autoStart: true,
  loading(loader) {
    loader.addImage('skeleton', './static/img/skeleton.png')
    loader.addJson('skeletonAtlas', './static/jsons/skeleton.json')
  },
  init(loader) {
    const atlas = loader.getJson('skeletonAtlas')
    this.skeleton = new Body(loader.getImage('skeleton'), {
      frames: atlas.frames, 
      scale: 2,
      x: this.parent.renderer.canvas.width / 2,
      y: this.parent.renderer.canvas.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      body: {
        debug: false
      }
    })
    this.skeleton.setFrame('skeleton', 'up', 'frame1')
    this.skeleton.width = this.skeleton.frame.width
    this.skeleton.height = this.skeleton.frame.height
    this.add(this, this.skeleton)
    this.nextframe = 1
  },
  update(timestamp) {
    const {controller} = this.parent

    this.skeleton.velocity.x = 0
    this.skeleton.velocity.y = 0
  
    if (controller.buttonDown('ArrowUp')) {
      if (this.nextframe > 7) {
        this.nextframe = 1
      }
      this.skeleton.setFrame('skeleton', 'up', `frame${this.nextframe}`)
      this.skeleton.velocity.y = -5
      this.nextframe += 1
    }

    if (controller.buttonDown('ArrowDown')) {
      if (this.nextframe > 7) {
        this.nextframe = 1
      }
      this.skeleton.setFrame('skeleton', 'down', `frame${this.nextframe}`)
      this.skeleton.velocity.y = 5
      this.nextframe += 1
    }

    if (controller.buttonDown('ArrowLeft')) {
      if (this.nextframe > 7) {
        this.nextframe = 1
      }
      this.skeleton.setFrame('skeleton', 'left', `frame${this.nextframe}`)
      this.skeleton.velocity.x = -5
      this.nextframe += 1
    }

    if (controller.buttonDown('ArrowRight')) {
      if (this.nextframe > 7) {
        this.nextframe = 1
      }
      this.skeleton.setFrame('skeleton', 'right', `frame${this.nextframe}`)
      this.skeleton.velocity.x = 5
      this.nextframe += 1
    }

    if (controller.buttonDown('Space')) {
      this.skeleton.rotation = timestamp / 1000
      // this.line.rotation = timestamp / 1000 так работать не будет
    }

    if (this.timeExist && this.timeExist < timestamp) {
      this.beforeDestroy()
    }
  }
})

const game = new Game({
  el: document.body,
  width: 500,
  height: 500,
  background: 'green',
  scenes: [mainScene]
})