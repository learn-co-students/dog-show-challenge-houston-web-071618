document.addEventListener('DOMContentLoaded', fetchAndDisplayDogs)
// Define UI Vars and URLs
const form = document.querySelector('#dog-form');
const tableBody = document.querySelector('tbody');
const BASE_URL = "http://localhost:3000";
const DOGS_URL = `${BASE_URL}/dogs`;
const parseJSON = resp => resp.json();

let nameInput = document.getElementsByName("name")[0]
let breedInput = document.getElementsByName("breed")[0]
let sexInput = document.getElementsByName("sex")[0]
let submitBtn = document.querySelector(".submit")


//------- BEGIN Load All Event Listeners --------
loadEventListeners();

function loadEventListeners() {
  // add new dog
  form.addEventListener('submit', updateDog);
  // edit dog
  tableBody.addEventListener('click', handleClickOfButton);
}

//------- END Load All Event Listeners --------

// The dog should be put on the table as a table row. The HTML might look something like this <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

//
//------- BEGIN Display Dogs --------
function fetchAndDisplayDogs() {
  fetch(DOGS_URL)
    .then(parseJSON)
    .then(dogs => addDogsToPage(dogs))
}

function addDogsToPage(dogs) {
  // debugger
  dogs.forEach(dog => addSingleDogToPage(dog))
}

function addSingleDogToPage(dog) {
  // debugger
  const dogTemplate = `
    <tr>
      <td>${dog.name}</td>
      <td>${dog.breed}</td>
      <td>${dog.sex}</td>
      <td><button data-id="${dog.id}">Edit</button>
      </td>
    </tr>
    `
  tableBody.innerHTML += dogTemplate
}
//------- END Display Dogs --------
//

//
//------- BEGIN populate dog --------

function handleClickOfButton(e){
  // debugger
  if(e.target.innerText === "Edit"){
    // console.log("inside the edit button")
    fetchDog(e.target.dataset.id, e)
  }
}

// Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
function fetchDog(dogId, e) {
  fetch(`${DOGS_URL}/${dogId}`)
    .then(parseJSON)
    .then(dog => populateDogInfo(dog, e))
}

function populateDogInfo(dog, e) {
  nameInput.value = dog.name;
  breedInput.value = dog.breed;
  sexInput.value = dog.sex;
  submitBtn.id = e.target.dataset.id;
  // debugger
}

//------- END populate dog --------
//

// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// Once the form is submitted, the table should reflect the updated dog information. You can either use the response from the PATCH request for this or use optimistic rendering. This means you can update the frontend before you have gotten the response from the backend.

//
//------- BEGIN update dog --------

function updateDog(e){
  // debugger
  fetch(`${DOGS_URL}/${e.target.children[3].id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      breed: breedInput.value,
      sex: sexInput.value
    })
  }).then(parseJSON)
}
//------- END update dog --------
//
