const {Game, Scene, Body, Point, Line, Util} = GameEngine

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
      scale: 1,
      x: this.parent.renderer.canvas.width / 2,
      y: this.parent.renderer.canvas.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      body: {
        debug: false
      }
    })
    
    this.skeleton.setFrameCollection(atlas.frames)
    this.skeleton.setAnimationsCollection(atlas.actions)
    // this.skeleton.setFrame('skeleton', 'up', 'frame1')
    // this.skeleton.width = this.skeleton.frame.width
    // this.skeleton.height = this.skeleton.frame.height
    this.skeleton.startAnimation('moveDown')
    this.add(this, this.skeleton)
  },
  update(timestamp) {
    const {controller} = this.parent
    let stay = true

    this.skeleton.velocity.x = 0
    this.skeleton.velocity.y = 0
  
    if (controller.buttonDown('ArrowUp')) {
      if (this.skeleton.currentAnimation !== 'moveUp') {
        this.skeleton.startAnimation('moveUp')
      }
      this.skeleton.velocity.y = -5
      stay = false
    }

    if (controller.buttonDown('ArrowDown')) {
      if (this.skeleton.currentAnimation !== 'moveDown') {
        this.skeleton.startAnimation('moveDown')
      }
      this.skeleton.velocity.y = 5
      stay = false
    }

    if (controller.buttonDown('ArrowLeft')) {
      if (this.skeleton.currentAnimation !== 'moveLeft') {
        this.skeleton.startAnimation('moveLeft')
      }
      this.skeleton.velocity.x = -5
      stay = false
    }

    if (controller.buttonDown('ArrowRight')) {
      if (this.skeleton.currentAnimation !== 'moveRight') {
        this.skeleton.startAnimation('moveRight')
      }
      this.skeleton.velocity.x = 5
      stay = false
    }

    if (stay && this.skeleton.currentAnimation !== 'stayDown') {
      this.skeleton.startAnimation('stayDown')
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