document.addEventListener('DOMContentLoaded', getAllDogs)
const parseJSON = resp => resp.json()
const dogEdit = document.getElementById("table-body")
const dogForm = document.getElementById("dog-form")
//fetch dogs
function getAllDogs() {
   return fetch ('http://localhost:3000/dogs')
   .then(parseJSON)
   .then(displayAllDogs)
}

//fetch a single dog
function getDog(dogID) {
    return fetch(`http://localhost:3000/dogs/${dogID}`)
    .then(parseJSON)
    .then(editDogForm)
}

function updateDog(dogID, name, breed, sex) {
    return fetch(`http://localhost:3000/dogs/${dogID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            breed: breed,
            sex: sex
        })
    }).then(parseJSON)
}

//display dogs on table
function displayAllDogs(dogs) {
    const dogCollection = document.getElementById("table-body")
    dogs.forEach(function(dog) {
        dogCollection.innerHTML +=  `
            <tr data-id="${dog.id}"><td >${dog.name}</td> 
                <td>${dog.breed}</td> 
                <td>${dog.sex}</td> 
                <td><button class ="edit-dog" data-id="${dog.id}">Edit</button></td>
            </tr>`
    })
}

//make dogs editable
dogEdit.addEventListener('click', function(event) {
    const editDogIsClicked = event.target.className === "edit-dog"
    
    if(editDogIsClicked) {
        dogID = event.target.dataset.id
        getDog(dogID)
    }
})

//display selected dog onto the edit form
function editDogForm (dog) {
    const formArray = dogForm.getElementsByTagName("input")
    formArray[0].value = dog.name
    formArray[1].value = dog.breed
    formArray[2].value = dog.sex
    formArray[3].id = dog.id
}

dogForm.addEventListener('submit', function(event) {
    const dogID = event.target.children[3].id
    const name = event.target.children[0].value
    const breed = event.target.children[1].value
    const sex = event.target.children[2].value
    updateDog(dogID, name, breed, sex)
})
