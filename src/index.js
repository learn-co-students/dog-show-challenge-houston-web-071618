document.addEventListener('DOMContentLoaded', () => {
  getAllDogs()

  const dogTableBody = document.getElementById('table-body')
  //have to grab parent of element you want to add event listner onto
  dogTableBody.addEventListener('click', clickOnEdit)

  function clickOnEdit(event){ //clickOnEdit is what happnes at event listner button "click"
    if (event.target.dataset.id) {
      addInfoToForm(event)
    }
  }

  function addInfoToForm(event){ //puts info from row into edit form
    let dogForm = document.getElementById('dog-form')
    let dogRow = event.target.parentElement.parentElement.children
    dogForm.children[0].value = dogRow[0].innerText //name
    dogForm.children[1].value = dogRow[1].innerText //breed
    dogForm.children[2].value = dogRow[2].innerText // sex
    dogForm.children[3].dataset.id = dogRow[3].children[0].dataset.id //id
  }
  const dogFormBody = document.getElementById('dog-form')
  dogFormBody.addEventListener('submit', function(event) {
    event.preventDefault();
    const dogName = dogFormBody.children[0].value
    const dogBreed = dogFormBody.children[1].value
    const dogSex = dogFormBody.children[2].value
    const dogId = dogFormBody.children[3].dataset.id
    updateDog(dogId, dogName, dogBreed, dogSex)
      .then(resp => resp.json())
      .then(dog =>  {
        document.getElementById(dog.id).innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button data-id="${dog.id}">Edit</button>
        </td>`
      })
    // console.log(event)
  })

  function updateDog(dogId, dogName, dogBreed, dogSex) {
    return fetch (`http://localhost:3000/dogs/${dogId}`, {
      method: "PATCH",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          name: dogName,
          breed: dogBreed,
          sex: dogSex,
      })
    })
  }

}) //END DOMContentLoaded

function getAllDogs() { //GRAB ALL DOGS
  return fetch(`http://localhost:3000/dogs`)
    .then(resp => resp.json())
    .then(dogs => addDogsToPage(dogs))
}

function getOneDog(dogId) { //GRAB 1 DOG (by ID dog.id)
  return fetch(`http://localhost:3000/dogs/${dogId}`)
    .then(resp => resp.json())
    .then(console.log)
}

function addDogsToPage(allDogs) { //ADD DOGS TO PAGE
  allDogs.forEach(function(dog){
  addDogToRow(dog)
  })
}
function addDogToRow(dog){ //ADD dogs info to table Row
  const dogTableBody = document.getElementById('table-body')
  const dogTableRow = document.createElement('tr')
  dogTableRow.id = dog.id
  dogTableRow.innerHTML = `
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button data-id="${dog.id}">Edit</button>
    </td>`
  dogTableBody.append(dogTableRow)
}
