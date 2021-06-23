const {Game, Scene, Body, Point, Line, Util, ArcadePhysics} = GameEngine

const mainScene = new Scene({
  name: 'mainScene',
  autoStart: true,
  loading(loader) {
    loader.addImage('skeleton', './static/img/skeleton.png')
    loader.addJson('skeletonAtlas', './static/jsons/skeleton.json')
  },
  init(loader) {
    const imageSkeleton = loader.getImage('skeleton')
    const atlas = loader.getJson('skeletonAtlas')
    this.arcadePhysics = new ArcadePhysics()
    this.skeleton = new Body(imageSkeleton, { 
      scale: 1,
      x: this.parent.renderer.canvas.width / 2,
      y: this.parent.renderer.canvas.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      body: {
        debug: true
      }
    })

    this.skeleton1 = new Body(imageSkeleton, { 
      scale: 1,
      x: 100,
      y: 100,
      anchorX: 0.5,
      anchorY: 0.5,
      body: {
        debug: true
      }
    })
    
    this.skeleton.setFrameCollection(atlas.frames)
    this.skeleton.setAnimationsCollection(atlas.actions)
    this.skeleton1.setFrameCollection(atlas.frames)
    this.skeleton1.setAnimationsCollection(atlas.actions)
    // this.skeleton.setFrame('skeleton', 'up', 'frame1')
    // this.skeleton.width = this.skeleton.frame.width
    // this.skeleton.height = this.skeleton.frame.height
    this.add(this, this.skeleton)
    this.add(this, this.skeleton1)
    this.arcadePhysics.add(this.skeleton, this.skeleton1)
    this.skeleton.on('collision', (a, b) => {
      a.startAnimation('stayDown')
      a.velocity.x = 0
      a.velocity.y = 0
    })
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

    if (stay && this.skeleton1.currentAnimation !== 'stayDown') {
      this.skeleton1.startAnimation('stayDown')
    }

    if (this.timeExist && this.timeExist < timestamp) {
      this.beforeDestroy()
    }
    this.arcadePhysics.porocessing()
  }
})

const game = new Game({
  el: document.body,
  width: 500,
  height: 500,
  background: 'green',
  scenes: [mainScene]
})