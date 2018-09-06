const dogsURL = 'http://localhost:3000/dogs'

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
 
})

const dogForm = document.querySelector('#dog-form')
const table = document.querySelector('#table-body')

table.addEventListener('click', (event) => {
  if (event.target.dataset.dogId) {
  const dogId = event.target.dataset.dogId
  fetchDog(dogId)
  }
})

function editDog (dog) {
  fillInForm(dog)

  dogForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editHandling(event)
  }) 
}

function editHandling (event) {



let dogName = dogForm.children.name.value
let dogBreed = dogForm.children.breed.value
let dogSex = dogForm.children.sex.value
let dogId = event.target.children[3].id

const updatedDog = new Dog(dogName, dogBreed, dogSex)

updatedDog.id = dogId

updateDog(updatedDog)

}

function updateDog (dog) {
  fetch(`${dogsURL}/${dog.id}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog)
  })
  .then(fetchDogs)
}

function fillInForm (dog) {
  const inputElements = document.getElementsByTagName('input')
  const name = inputElements[0]
  const breed = inputElements[1]
  const sex = inputElements[2]
  const button = inputElements[3] //incase i need it

  // document.getElementsByTagName('input')[0].value = `${dog.name}`
  name.value = `${dog.name}`
  breed.value = `${dog.breed}`
  sex.value = `${dog.sex}`
  button.id = `${dog.id}`
}

function fetchDog (dogId) {
  fetch(`${dogsURL}/${dogId}`)
  .then(resp => resp.json())
  .then(dog => editDog(dog))
}


function fetchDogs () {
  fetch(dogsURL)
  .then(resp => resp.json())
  .then(data => renderDogs(data))
}

function renderDogs (dogs) {
  const table = document.querySelector('#table-body')
  table.innerHTML =''
  dogs.forEach(dog => {
    renderDog(dog)
  })
}
function renderDog (dog) {
  const table = document.querySelector('#table-body')

  let row = document.createElement('tr')

  row.id = dog.id
 
  let nameColumn = document.createElement('td')
  nameColumn.innerText = dog.name

  let breedColumn = document.createElement('td')
  breedColumn.innerText = dog.breed

  let sexColumn = document.createElement('td')
  sexColumn.innerText = dog.sex

  let buttonColumn = document.createElement('td')
  buttonColumn.innerHTML = `<button data-dog-id="${dog.id}">Edit</button>`
  
  row.append(nameColumn); row.append(breedColumn); row.append(sexColumn); row.append(buttonColumn);
  table.append(row)
}