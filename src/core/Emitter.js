//This class is realizing observer pattern
export class Emitter {
    constructor() {
        this.listeners = []
    }

//This method allows to add new event in component
    emit(event, ...args) {
        if (!Array.isArray(this.listeners[event])) {
            return false
        }
        this.listeners[event].forEach(listener => {
            listener(...args)
        })
        return true
    }

//And method subscribe need to subscribe on event created by emit()
    subscribe(event, fn) {
        this.listeners[event] = this.listeners[event] || []
        this.listeners[event].push(fn)

        return () => {
            this.listeners[event] = 
                this.listeners[event].filter(listener => listener !== fn)
        }
    }
}