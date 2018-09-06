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
function listenToSubmitInput(event){
    event.preventDefault()
    let id = parseInt(dogForm.dataset.id)
    if(id){
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
        }).then(resp => resp.json())
            .then(updateDogs)
    }
}

// clear the input fields after submitting the dog edits through getAllDogs()
function updateDogs(){
    tableBody.innerHTML = '';
    getAllDogs();
    nameInput.value = '';
    breedInput.value = '';
    sexInput.value = '';
}

//event listener callback
function listenToEditButtons(event){
    let id = parseInt(event.target.dataset.id)
    if (id){
        fetch(`http://localhost:3000/dogs/${id}`)
            .then(res => res.json())
            .then(function(dog){
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
