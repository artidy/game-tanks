const {Game, Scene, Body, Point, Line} = GameEngine

const mainScene = new Scene({
  name: 'mainScene',
  autoStart: true,
  loading(loader) {
    loader.addImage('lodka', './static/img/lodka.jpg')
    loader.addJson('persons', './static/jsons/persons.json')
  },
  init(loader) {
    this.lodka = new Body(loader.getImage('lodka'), {
      scale: 0.25,
      x: this.parent.renderer.canvas.width / 2,
      y: this.parent.renderer.canvas.height / 2,
      anchorX: 0.5,
      anchorY: 0.5,
      body: {
        debug: true
      }
    })
    this.add(this, this.lodka)
  },
  update(timestamp) {
    const {controller} = this.parent
  
    if (controller.buttonDown('ArrowUp')) {
      this.lodka.y -= 1
    }

    if (controller.buttonDown('ArrowDown')) {
      this.lodka.y += 1
    }

    if (controller.buttonDown('Space')) {
      this.lodka.rotation = timestamp / 1000
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