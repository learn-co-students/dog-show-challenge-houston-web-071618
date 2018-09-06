document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
  	.then(function(dogObjects) {
        insertDogs(dogObjects)
    });

  function insertDogs(dogObjects){
    const dogsTable = document.getElementById('table-body')
    dogObjects.forEach(function(dog){
      const dogsTemplate = `
      <tr id = "dog-${dog.id}"><td data-name="${dog.name}">${dog.name}</td>
      <td data-breed="${dog.breed}">${dog.breed}</td>
      <td data-sex="${dog.sex}">${dog.sex}</td>
      <td><button data-id="${dog.id}">Edit</button></td></tr>`
      dogsTable.innerHTML += dogsTemplate
    })
  }

  const dogEditButton = document.getElementById('table-body')
  dogEditButton.addEventListener('click',function(event){
      if(event.target.dataset.id)
      populateDogForm(event.target.dataset.id,event.target.dataset.name,event.target.dataset.breed,event.target.dataset.sex)
  })

  function populateDogForm(dogId,dogName,dogBreed,dogSex){
    const dogForm = document.getElementById('dog-form')

    fetch(`http://localhost:3000/dogs/${dogId}`)
      .then(resp => resp.json())
      .then(dogInfo => {
        dogForm.innerHTML = `<input id= "name" type="name" name="name" placeholder="name" value="${dogInfo.name}">
        <input id = "breed" type="breed" name="breed" placeholder="breed" value="${dogInfo.breed}">
        <input id = "sex" type="sex" name="sex" placeholder="sex" value="${dogInfo.sex}">
        <input id = "${dogInfo.id}" type="submit"value="Submit">`
      })
    dogForm.addEventListener('submit', function(event){
      event.preventDefault();
      let dogName = document.querySelector("#name").value
      let dogBreed = document.querySelector("#breed").value
      let dogSex = document.querySelector("#sex").value
      let dogId = dogForm.querySelector("[type = 'submit']").id
        submitDogForm(dogId,dogName,dogBreed,dogSex)
    })

  }

  function submitDogForm(dogId,dogName,dogBreed,dogSex){

    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: dogName,
        breed: dogBreed,
        sex: dogSex,
      })
    }).then(resp => resp.json())
      .then(function(newDogInfo){
        editDog(newDogInfo)
      })
  }

  function editDog(newDogInfo){
    const dogRow = document.getElementById(`dog-${newDogInfo.id}`)
    console.log(dogRow)
    const dogsTemplate = `
    <tr id = "dog-${newDogInfo.id}" ><td data-name="${newDogInfo.name}">${newDogInfo.name}</td>
    <td data-breed="${newDogInfo.breed}">${newDogInfo.breed}</td>
    <td data-sex="${newDogInfo.sex}">${newDogInfo.sex}</td>
    <td><button data-id="${newDogInfo.id}">Edit</button></td></tr>`
    dogRow.innerHTML = dogsTemplate
  }


})
