const BASE_URL = "http://localhost:3000/dogs";

// DOM Elements
const TABLE_BODY = document.getElementById('table-body');
const DOG_NAME_INPUT = document.getElementById('dog-name');
const DOG_BREED_INPUT = document.getElementById('dog-breed');
const DOG_SEX_INPUT = document.getElementById('dog-sex');
const DOG_SUBMIT_BUTTON = document.getElementById('submit-dog');

// Event Listeners
DOG_SUBMIT_BUTTON.addEventListener('click', handleDogSubmit);
TABLE_BODY.addEventListener('click', handleDogEdit);

// Instantiate Dogs
function createDogs(dog) {
  return new Dog(dog);
}

// Clear Inputs
function clearInputs() {
  DOG_NAME_INPUT.className = '';
  DOG_SEX_INPUT.value = '';
  DOG_BREED_INPUT.value = '';
  DOG_NAME_INPUT.value = '';
}

// Create Rows for Dogs
function displayAllDogs() {
  TABLE_BODY.innerHTML = Dog.all().map(dog => dog.render()).join('');
}

// Event Handlers
function handleDogEdit(e) {
  e.preventDefault();
  if (e.target.id.includes('edit')) {
    let selectedDog = parseInt(e.target.id.split('-')[1]);
    let {
      id,
      name,
      breed,
      sex
    } = dogs.getDogById(selectedDog);
    DOG_NAME_INPUT.value = name;
    DOG_BREED_INPUT.value = breed;
    DOG_SEX_INPUT.value = sex;
    DOG_NAME_INPUT.classList += id;
  }
}

function handleDogSubmit(e) {
  e.preventDefault();

  let id = (parseInt(DOG_NAME_INPUT.className));

  if (id) {
    let currentDog = dogs.getDogById(id);
    currentDog.name = DOG_NAME_INPUT.value;
    currentDog.breed = DOG_BREED_INPUT.value;
    currentDog.sex = DOG_SEX_INPUT.value;
    sendDogPatchRequest(currentDog);
    clearInputs();
  }
}
// Send Patch Request to Back-end
function sendDogPatchRequest(dog) {
  fetch(`${BASE_URL}/${dog.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: dog.name,
      breed: dog.breed,
      sex: dog.sex
    })
  }).then(displayAllDogs);
}

// Fetch Dogs
fetch(BASE_URL).then(response => response.json()).then(x => x.map(createDogs)).then(displayAllDogs);