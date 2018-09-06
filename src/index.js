document.addEventListener('DOMContentLoaded', () => {

	const DOGSURL = 'http://localhost:3000/dogs'
	const TableDiv = document.querySelector('table')
	const dogForm = document.querySelector('#dog-form')


	TableDiv.addEventListener('click', editDog)
	dogForm.addEventListener('submit', updateDog)
	//debugger

	function getDogs(){
		fetch(DOGSURL)
		.then(resp => resp.json())
		.then(insertDogsToPage)
	}
	
	getDogs()

	function insertDogsToPage(dogs){
		//debugger
		//const TableDiv = document.querySelector('table')
		//console.log(TableDiv)
		dogs.forEach(function(dog){
			renderDog(dog)
		})
	}


	function renderDog(dog){

		//debugger
		TableDiv.innerHTML += `<tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id = ${dog.id}>Edit</button></td></tr>`
	}


	function editDog(event){
		//console.log(dogForm)
		//debugger

		let dogId = event.target.id
		if(dogId){
			let dogName = event.target.parentElement.parentElement.children[0].innerText
			let dogBreed = event.target.parentElement.parentElement.children[1].innerText
			let dogSex = event.target.parentElement.parentElement.children[2].innerText

			dogForm.name.value = dogName
			dogForm.name.id = dogId
			dogForm.breed.value = dogBreed
			dogForm.sex.value = dogSex
		}
	}

	function updateDog(event){
		//debugger
		//event.preventDefault()
		fetch(DOGSURL+`/${event.target.name.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				name: event.target.name.value,
				breed: event.target.breed.value,
				sex: event.target.sex.value
			})

		})//end of fetch
		.then(getDogs)
	}

	//getDogs()

})

