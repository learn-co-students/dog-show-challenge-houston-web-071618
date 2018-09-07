//DOM elements
const nameInput = document.getElementById('name-input');
const breedInput = document.getElementById('breed-input');
const sexInput = document.getElementById('sex-input');
const submitInput = document.getElementById('submit-input');
const tableBody = document.getElementById('table-body')
const dogForm = document.getElementById('dog-form')

// Event Listeners
tableBody.addEventListener("click", listenToEditButtons)
submitInput.addEventListener("click", listenToSubmitInput)

//event listener callback
function listenToSubmitInput(event) {
    event.preventDefault();
    let id = parseInt(dogForm.dataset.id)
    if (id) {
        fetch(`http://localhost:3000/dogs/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameInput.value,
                breed: breedInput.value,
                sex: sexInput.value
            })
            //ideally don't refresh page here. 
        }).then(resp => resp.json())
            .then(updateDogs)
    }
}

function updateDogs(dog) {
    //this is selecting the dog id value from the appendDogInfo function, which attaches the row info for each dog dynamically.
    let selectedDogRow = document.getElementById(`${dog.id}`)
    row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <button data-id=${dog.id}>Edit</button>
        `
}

//event listener callback
function listenToEditButtons(event) {
    event.preventDefault()
    let id = parseInt(event.target.dataset.id)
    if (id) {
        fetch(`http://localhost:3000/dogs/${id}`)
            .then(res => res.json())
            .then(function (dog) {
                nameInput.value = dog.name
                dogForm.dataset.id = dog.id
                breedInput.value = dog.breed
                sexInput.value = dog.sex
            })
    }
}

function getAllDogs() {
    fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(dogs => appendDogInfo(dogs))
}

function appendDogInfo(dogs) {
    dogs.forEach(dog => {
        const row = document.createElement('tr')
        row.id = dog.id;
        row.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <button data-id=${dog.id}>Edit</button>
        `
        tableBody.append(row)
    })
}

//fetch information
getAllDogs();
