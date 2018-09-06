function buildDogClass(table, form) {
  class Dog {
    constructor(params) {
      this.attributes = params;
      this.events = new EventEmitter;
      Dog.all.push(this)
      this.element = document.createElement('tr')
      table.append(this.element)
      this.render()
    }
    
    get attributes() {
      return {
        id: this.id, 
        name: this.name, 
        breed: this.breed, 
        sex: this.sex 
      }
    }
    
    set attributes(params) {
      this.id = params.id,
      this.name = params.name,
      this.breed = params.breed,
      this.sex = params.sex
    }
    
    on(event, callback){
      this.events.on(event,callback)
    }
    
    emit(event, data){
      this.events.emit(event,data)
    }
    
    render() {
      this.element.innerHTML = `
        <td>${this.name}</td> 
        <td>${this.breed}</td> 
        <td>${this.sex}</td> 
        <td><button class="edit-button">Edit</button></td>
      `
     
      let editButton = this.element.querySelector('.edit-button')
      editButton.addEventListener('click', () => {
        Dog.selectedDog = this 
        Dog.populateForm(this)
     })
    }

    static populateForm(dogObject) {
      form.name.value = dogObject.name
      form.breed.value = dogObject.breed
      form.sex.value = dogObject.sex
    }  
  }

  Dog.all = new Array;
  Dog.selectedDog = null
  
  form.addEventListener('click', function(e){
    e.preventDefault()
    let dogObject = Dog.selectedDog
    
    dogObject.attributes = {
      id: dogObject.id,
      name: form.name.value,
      breed: form.breed.value,
      sex: form.sex.value
    }
    
    dogObject.render()
    dogObject.emit('update', dogObject.attributes) 
  });
  
  return Dog
}