document.addEventListener('DOMContentLoaded', () => {
  const tableDiv = document.querySelector('table')
  const editDogForm = document.getElementById('dog-form')
  const editInputs = editDogForm.querySelectorAll('input')
  const editName = editInputs[0]
  const editBreed = editInputs[1]
  const editSex = editInputs[2]

  tableDiv.addEventListener('click', editDog)
  editDogForm.addEventListener('submit', updateDog)

  function fetchDogs() {
    fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
      .then(resp => renderDogs(resp))
  }

  function renderDogs(dogs) {
    dogs.forEach(dog => renderOneDog(dog))
  }

  function renderOneDog(dog) {
    tableDiv.innerHTML += dogTemplate(dog)
  }

  function dogTemplate(dog) {
    return `<tr data-dog-id=${dog.id}><td>${dog.name}</td><td>${dog.breed}</td><td>${dog.sex}</td><td><button class="edit-dog">Edit</button></td></tr>`
  }

  function editDog(event) {
    if (event.target.className === "edit-dog") {
      let id = event.target.parentElement.parentElement.dataset.dogId
      let info = event.target.parentElement.parentElement.querySelectorAll('td')
      let name = info[0].innerText
      let breed = info[1].innerText
      let sex = info[2].innerText

      fillEditDogForm(id, name, breed, sex)

    }
  }

  function fillEditDogForm(id, name, breed, sex) {
    editName.value = name
    editName.innerText = name
    editName.id = id
    editBreed.value = breed
    editBreed.innerText = breed
    editSex.value = sex
    editSex.innerText = sex
  }

  function updateDog() {
    event.preventDefault()

    fetch(`http://localhost:3000/dogs/${editName.id}`, {
      method: "PATCH",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        id: editName.id,
        name: editName.value,
        breed: editBreed.value,
        sex: editSex.value
      })
    })

    .then(resp => resp.json())
    .then(dog => rerenderExistingDog(dog))
  }

  function rerenderExistingDog(dog) {
    document.querySelector(`[data-dog-id="${dog.id}"]`).innerHTML = dogTemplate(dog)
  }

  fetchDogs()

})
