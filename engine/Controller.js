(function() {
  'use strict'

  class Controller {
    constructor() {
      this.activeButtons = []
      this.addButton = this.addButton.bind(this)
      this.deleteButton = this.deleteButton.bind(this)
      this.addMouseButton = this.addMouseButton.bind(this)
      this.deleteMouseButton = this.deleteMouseButton.bind(this)
      document.body.addEventListener('keydown', this.addButton)
      document.body.addEventListener('keyup', this.deleteButton)
      document.body.addEventListener('mousedown', this.addMouseButton)
      document.body.addEventListener('mouseup', this.deleteMouseButton)
    }

    addButton(event) {
      if (!this.activeButtons.includes(event.code)) {
        this.activeButtons.push(event.code)
      } 
    }

    deleteButton(event) {
      if (this.activeButtons.includes(event.code)) {
        this.activeButtons = this.activeButtons.filter(keycode => keycode !== event.code)
      }
    }

    addMouseButton(event) {
      const code = this.getMouseCode(event.buttons)
      if (code && !this.activeButtons.includes(code)) {
        this.activeButtons.push(code)
      } 
    }

    deleteMouseButton(event) {
      const code = this.getMouseCode(event.buttons)
      if (this.activeButtons.includes(code)) {
        this.activeButtons = this.activeButtons.filter(keycode => keycode !== code)
      }
    }

    getMouseCode(button) {
      switch(button) {
        case 1:
          return 'LeftMouseButton'
        case 0:
          return 'LeftMouseButton'
        default:
          return ''
      }
    }

    buttonDown(button) {
      return this.activeButtons.includes(button)
    }

  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.Controller = Controller
})()