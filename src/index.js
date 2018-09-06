let allDogs = [];
let currentDog = null; // for setting stuff later
document.addEventListener('DOMContentLoaded', () => {
//Be able to add a dog via the given html form
  // get data from the 3 text inputs when 'submit' is pressed
  // preventDefault to prevent page from refreshing
  // add new dog to the DOM
    //take variables and assign them to the proper places
  // (optional) store dog locally in an array for ref

//Add eventListeners for 'edit' buttons using delegation (whatever it's called.)

//dog on the table looks like this:
/*

  <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

*/

//==================================================================
//let's start by grabbing some html elements we might need
const dogForm = document.getElementById('dog-form');
const nameField = dogForm.querySelectorAll('input')[0];
const breedField = dogForm.querySelectorAll('input')[1];
const sexField = dogForm.querySelectorAll('input')[2];
const dogTable = document.querySelector("table");


function getDogs(){
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(parseDoggos)
}//getDogs
function parseDoggos(dogArray)
{
  for(let dog of dogArray){
    console.log(dog + " ADDED!");
    //probably want to get the ID, NAME, BREED, and SEX to be able to declare a new dog object
    const dogID = dog.id;
    const dogName = dog.name;
    const dogBreed = dog.breed;
    const dogSex = dog.sex;

    //======= MAKE THE DOG OBJECT ========
    let doggo = new Dog(dogID,dogName,dogBreed,dogSex);
    allDogs.push(doggo); // shove all them new dogs into an []

  }//for
  //======= DISPLAY THE DOG OBJECT  =========
  // now we need to populate the list with stuff
  // preferably from the allDogs[] since that's where the data
  // persists.
  render();
  //======= SET OUR EVENTLISTENERS ========
  // delegation! RAWR!
  // console.log(allDogs);
  setEventListeners();

}//parseDoggos
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}//toTitleCase REGEX MUTHAFUCKER!!!

function editDog(name,breed,sex){ //e is the eventCall
  //find our dog in the allDogs[]
  let ourGoodBoi = allDogs.find(function(el){
    return el.id = currentDog.id;
  })
  let index = parseInt(ourGoodBoi.id)-1

  //edit the dog in the array. may require a fetch
  let newBoi = new Dog(ourGoodBoi.id,name,breed,sex)

  allDogs[index] = newBoi;
  render();

  //OMFG TIME TO USE A PATCH TO CHANGE THE DB THEN WE'RE DONE:
  patchThisShit(newBoi, index);

}//editDog()
function setEventListeners(){
  // let's set eventListeners for the stuff that was already there.

  //---------------------------------------------------------
  dogForm.addEventListener("submit",function(e){
    e.preventDefault();

    // grab text from fields, makes sure they're REGEX secure Then
    // pass into a dog making function.
    let name = nameField.value;
    let breed = breedField.value;
    let sex = sexField.value;
    if(currentDog)
    {
      if(name && breed && sex){
        //they all exist (though some regex might help)
        if(sex.toLowerCase().trim() === "male" || sex.toLowerCase().trim() === "female"){
          editDog(name, toTitleCase(breed), sex);
        }else {
          alert('Not gonna entertain your LGBTBBQWTF. Male/Female ONLY');
        }
      }//if all 3 fields exist!
      else{
        alert('Put some text in the forms, you dolt!');
      }//if they don't exist!
    }else {
      alert("you didn't select a dog yet!")
    }//else no currentDog

  });//addEventListener (Submit)
    //---------------------------------------------------------
    dogTable.addEventListener("click",function(e){
      if(e.target.dataset.dogId)//if you clicked the button functionality
      {
        // get our doggo's ID
        let tempDogID = e.target.dataset.dogId;
        // find our doggo's index from the allDogs[]
        let tempDogObject = allDogs.find(function(el){
          return el.id == tempDogID;
        });
        // apply the doggo's stuff to the forms
        currentDog = tempDogObject
        nameField.value = tempDogObject.name
        breedField.value = tempDogObject.breed
        sexField.value = tempDogObject.sex
      }//if the thing you clicked is the edit button

    });//addEventListener (Edit)

}//setEventListeners()
function render(){
  //grabs the dogs from the allDog[] and makes em visible!
  //let's grab the HTML we need to put stuff in and make any
  //necessary templates for them.
  const dogTable = document.querySelector("table");


  dogTable.innerHTML = `<thead class='blue'>
    <tr class='padding'>
      <th class='padding center'>Name</th>
      <th class='padding center'>Breed</th>
      <th class='padding center'>Sex</th>
      <th class='padding center'>Edit Dog</th>
    </tr>
  </thead>`

  //now let's put some dogs in em!
  allDogs.forEach(function(dog){
    if(dog){
      const dogTemplate = `
        <tr id="${dog.id}">
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td><button data-dog-id="${dog.id}">Edit</button></td>
        </tr>
      `
      dogTable.innerHTML += dogTemplate;
    }//if (makes sure dog exists)
    else{
      alert("dog is Invalid!");
    }//else (throw an error-alert-thing)

  });//forEach
}//render()
function patchThisShit(dog, index){
  fetch(`http://localhost:3000/dogs/${dog.id}`, {
    method: "PATCH",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({
      //data in here
      //id: `${dog.id}`,
      name: `${dog.name}`,
      breed: `${dog.breed}`,
      sex: `${dog.sex}`
    })//stringify
  }).then(res => res.json())
  .then(data => alert("Dog PATCHED!")) // or should be
}//patchThisShit!


getDogs(); //THIS IS WHERE THE MAGIC STARTS!!!!
})//DOMContentLoaded
