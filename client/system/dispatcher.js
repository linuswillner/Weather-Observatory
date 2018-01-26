// Custom Node-style event emitter for the browser
import EventEmitter from 'wolfy87-eventemitter'

const dispatcher = new EventEmitter()

function emit (event, args) {
  dispatcher.emit(event, args)
}

export { emit, dispatcher }
