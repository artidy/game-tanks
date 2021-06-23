(function() {
  'use strict'

  class EventEmitter {
    constructor() {
      this.handlers = {}
    }

   on(...args) {
     this.addEventListener(...args)
   }

   off(...args) {
     this.removeEventListener(...args)
   }

   addEventListener(name, handler) {
     if (!this.handlers.hasOwnProperty(name)) {
      this.handlers[name] = []
     }
     this.handlers[name].push(handler)
   }

   removeEventListener(name, handler) {
    if (this.handlers.hasOwnProperty(name)) {
      this.handlers[name] = this.handlers[name].filter(item => item !== handler)
     }
   }

   emit(name, ...args) {
     if (this.handlers.hasOwnProperty(name)) {
      this.handlers[name].forEach(handler => {
        handler(...args)  
      })
     }
   }

  }

  window.GameEngine = window.GameEngine || {}
  window.GameEngine.EventEmitter = EventEmitter
})()