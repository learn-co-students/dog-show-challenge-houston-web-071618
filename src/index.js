document.addEventListener('DOMContentLoaded', () => {
  tableBody = document.getElementById("table-body")
  dogForm = document.getElementById("dog-form")
  fetchDogs();
  addEventListenertoTable();
  addEventListenertoSubmit();
})

function fetchDogs(){
  fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(placeDogsinTable)
}

function placeDogsinTable(dogs){
  tableBody.innerHTML = ""
  dogs.forEach(placeSingleDog)
}

const placeSingleDog = function(dog){
    dogHtml =`
      <tr id = "${dog.id}">
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td ><button data-dog-id = "${dog.id}" >Edit</button></td>
      </tr>`
      tableBody.innerHTML += dogHtml;
}


function addEventListenertoTable(){
  tableBody.addEventListener("click", function(event){
    event.preventDefault();
    const dogId = event.target.dataset.dogId
    if(!!dogId){
      const arrayoOfDogsTds= document.getElementById(`${dogId}`).querySelectorAll("td")
      let dogObj={
        id:dogId,
        name:arrayoOfDogsTds[0].innerText,
        breed:arrayoOfDogsTds[1].innerText,
        sex:arrayoOfDogsTds[2].innerText
      }
      populateEditFields(dogObj);
    }
  })
}

function populateEditFields(dog){
  const arrDogForm = [...dogForm]
  const name = arrDogForm.find(function(el){return el.name === "name"})
  const breed = arrDogForm.find(function(el){return el.name === "breed"})
  const sex = arrDogForm.find(function(el){return el.name === "sex"})
  const id = arrDogForm.find(function(el){return el.type === "submit"})

  name.value = dog.name;
  breed.value = dog.breed;
  sex.value = dog.sex;
  id.dataset.id = dog.id;
}

function addEventListenertoSubmit(){
  dogForm.addEventListener("submit", function(event){
    event.preventDefault();
    const arrayofForm = [...event.target]
    if(!!arrayofForm[3].dataset.id){
      let dogObj ={}
      for(el of dogForm){
        if(el.name === "name"){
          dogObj.name = el.value
        }
        else if (el.name === "breed") {
          dogObj.breed = el.value
        }
        else if (el.name === "sex") {
          dogObj.sex = el.value
        }
        else if (el.type === "submit") {
          dogObj.id = el.dataset.id
        }
      }

      if ((dogObj.name != "")&&(dogObj.breed != "")&&(dogObj.sex != ""))
      {
        sendPatch(dogObj);
        arrayofForm[0].value = ""
        arrayofForm[1].value = ""
        arrayofForm[2].value = ""
        arrayofForm[3].dataset.id=""
      }
      else{
        alert("no field can be empty")
      }
    }
    else{
      alert("need to select a dog to edit")
    }
  })
}

function sendPatch(dog){
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": `${dog.name}`,
    "breed": `${dog.breed}`,
    "sex": `${dog.sex}`
  })
}).then(fetchDogs)
}
