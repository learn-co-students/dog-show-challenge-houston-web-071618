document.addEventListener('DOMContentLoaded', () => {
  const table = document.querySelector('#table-body');
  const form = document.querySelector('#dog-form')
  const Dog = buildDogClass(table, form);
  
  (async function loadAndDisplayDogs() {
    let dogsArray = await Adapter.getAllDogs()
    dogsArray.forEach( dogOptions => {
      let dog = new Dog(dogOptions)
      dog.on('update', values => {
        Adapter.updateDog(values)
      })
    })
  })()
})