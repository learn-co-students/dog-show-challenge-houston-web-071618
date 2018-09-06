class EventEmitter {
  constructor(options) {
    this.options = options;
    this.bin = {};
  }

  on(events, callback){
    const EventManager = this;
    if(typeof events == 'string' || typeof events == 'number') {
      return events+'|@|'+EventManager.provision(events, callback);
    }
    return false;
  }

  cancel(eventID) {
    const EventManager = this;
    let [event, id] = eventID.split('|@|')
    if(typeof this.bin[event] != 'undefined' && this.bin[event][id]) {
      delete this.bin[event][id]
      return true;
    }
    return false
  }

  emit(event, data) {
    if(typeof this.bin[event] != 'undefined'){
      this.bin[event].forEach(resolve => { if(typeof resolve == 'function') resolve(data) });
    }
  }

  provision(namespace, resolve) {
    let EventManager = this;
    if(typeof this.bin[namespace] == 'undefined') {
      EventManager.bin[namespace] = new Array;
    }
    return EventManager.bin[namespace].push(resolve) -1;
  }
}