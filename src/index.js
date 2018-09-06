document.addEventListener('DOMContentLoaded', () => {
// - On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.

// - The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`

  const dogsURL = "http://localhost:3000/dogs"
// Get the Dogs
  fetch(dogsURL)
  .then (resp => resp.json())
  .then (addDogsTable)
  // .then (data => console.log(data))
  

// get table. 
const dogTable = document.getElementById("table-body")
// console.log(dogTable)
// make dog table row template


// add dog table and rows to document
function addDogsTable(dogsData){
  dogsData.forEach((dog) => {
    // make dog table row template
    const dogRowTemplate =` <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button data-id=${dog.id}>Edit</button></td></tr>`

    dogTable.innerHTML += dogRowTemplate
  })
}

// - Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.

//get form 
const dogForm = document.getElementById("dog-form")
// console.log(dogForm.name)


  // populate form
  function populateForm (dog){
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    dogForm.dataset.id = dog.id
  }

//listen to buttons on table, know who
 dogTable.addEventListener("click", function(e){
  const clickedDogButton = e.target.dataset.id
  // console.log(dogsURL + `/${clickedDogButton}`)

  fetch(dogsURL + `/${clickedDogButton}`)
  .then (resp => resp.json())
  .then (populateForm)

  })

  // - On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).

   // have dog id

  //patch request with dog info


// - Once the form is submitted, the table should reflect the updated dog information. You can either use the response from the PATCH request for this or use _optimistic rendering_. This means you can update the frontend before you have gotten the response from the backend.

  //listen for submit
  dogForm.addEventListener("submit", function(e){
    e.preventDefault()
    const doggoId = e.target.dataset.id
    console.log(e)
    fetch(dogsURL +`/${doggoId}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
       },
      body: JSON.stringify({
        name : dogForm.name.value,
        breed: dogForm.breed.value,
        sex : dogForm.sex.value
         })
    })

  })

 

})









// - In order to locate one row on the DOM and update specific data cells within it, you may need to assign id and or class values to locate each attribute.
