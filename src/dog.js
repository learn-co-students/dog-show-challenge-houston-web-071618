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
    
    get attributes(){
      return {
        id: this.id, 
        name: this.name, 
        breed: this.breed, 
        sex: this.sex 
      }
    }
    
    set attributes(params){
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
        <td><button class="edit-button">Edit</button></td>`
     
      let editButton = this.element.querySelector('.edit-button')
      editButton.addEventListener('click', () => {
        Dog.selectedDogId = this.id 
        Dog.populateForm(this)
     })
    }

    static populateForm(dogObject) {
      form.name.value = dogObject.name
      form.breed.value = dogObject.breed
      form.sex.value = dogObject.sex
    }  
    
    static findDogById(dogId) {
      return Dog.all.find(dog => dog.id == dogId)
    }
  }

  Dog.all = new Array;
  Dog.selectedDogId = null
  
  form.addEventListener('click', function(e){
    e.preventDefault()
    dogObject = Dog.findDogById(Dog.selectedDogId)
    dogObject.attributes = {
      id: dogObject.id,
      name: e.target.parentElement.name.value,
      breed: e.target.parentElement.breed.value,
      sex: e.target.parentElement.sex.value
    }
    dogObject.render()
    dogObject.emit('update', dogObject.attributes) 
  });
  
  return Dog
}