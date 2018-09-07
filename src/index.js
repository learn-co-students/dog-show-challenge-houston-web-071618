document.addEventListener('DOMContentLoaded', () => {

	const dogsURL = 'http://localhost:3000/dogs'
	const parsedJSON = response => response.json()
	const registeredDogsTable = document.querySelector('#table-body')
	const divAddForm = document.querySelector('#add-dog-form')
	const divForm = document.querySelector('#dog-form')
	const deleteButton = document.querySelector('#dog-form').lastElementChild
	let addDogBtn = true;
	let defaultAddForm = divAddForm.style.display = 'none';

	fetch(dogsURL)
		.then(parsedJSON)
		.then(function showDogs(dogs) {
			dogs.forEach(dog => {
				registeredDogsTable.innerHTML += `
					<tr id="tr-${dog.id}">
						<td class='padding center' id="name-${dog.id}">${dog.name}</td> 
						<td class='padding center' id="breed-${dog.id}">${dog.breed}</td> 
						<td class='padding center' id="sex-${dog.id}">${dog.sex}</td> 
						<td class='padding center'><button data-id="${dog.id}">Edit Dog</button></td>
					</tr>
				`
			})
		})

	document.querySelector('#new-dog-btn').addEventListener('click', ShowAddDogForm)

	function ShowAddDogForm(event) {

		if (addDogBtn) {
		    	divAddForm.style.display = 'block'
		} else {
		    	divAddForm.style.display = 'none'
		}
		
		addDogBtn = !addDogBtn
	}

	registeredDogsTable.addEventListener('click', addDogToFormForEdit)
	
	function addDogToFormForEdit(event) {

		event.preventDefault();

		divForm[0].value = document.getElementById(`name-${event.target.dataset.id}`).innerHTML
		divForm[1].value = document.getElementById(`breed-${event.target.dataset.id}`).innerHTML
		divForm[2].value = document.getElementById(`sex-${event.target.dataset.id}`).innerHTML
		divForm.dataset.id = event.target.dataset.id

	}



	divAddForm.addEventListener('submit', addDog)

	function addDog(event) {

		if (divAddForm[0].value && divAddForm[1].value && divAddForm[2].value) {

			fetch(dogsURL, {
				method: 'POST',
				body: JSON.stringify({
					    "name": divAddForm[0].value,
					    "breed": divAddForm[1].value,
					    "sex": divAddForm[2].value
				}),
				headers: {
					"Content-Type" : "application/json"
				}
			})
			.then(parsedJSON)
			.then(function showDogs(dogs) {
				dogs.forEach(dog => {
					registeredDogsTable.innerHTML += `
						<tr id="tr-${dog.id}">
							<td class='padding center' id="name-${dog.id}">${dog.name}</td> 
							<td class='padding center' id="breed-${dog.id}">${dog.breed}</td> 
							<td class='padding center' id="sex-${dog.id}">${dog.sex}</td> 
							<td class='padding center'><button data-id="${dog.id}">Edit Dog</button></td>
						</tr>
					`
				})
			})
		}
	}

	divForm.addEventListener('submit', editDog)

	function editDog(event) {
		// event.preventDefault();
		
		fetch(dogsURL + '/' + event.target.dataset.id, {
			method: 'PATCH',
			body: JSON.stringify({
				    "name": divForm[0].value,
				    "breed": divForm[1].value,
				    "sex": divForm[2].value
			}),
			headers: {
				"Content-Type" : "application/json"
			}
		})
	}

	deleteButton.addEventListener('click', deleteDog)

	function deleteDog(event) {
		// event.preventDefault();

		if (document.getElementById(`tr-${event.target.parentElement.dataset.id}`).id === `tr-${event.target.parentElement.dataset.id}`) 

		{
			fetch(dogsURL + '/' + event.target.parentElement.dataset.id, {
				method: 'DELETE',
				body: JSON.stringify({
					    "name": divForm[0].value,
					    "breed": divForm[1].value,
					    "sex": divForm[2].value
				}),
				headers: {
					"Content-Type" : "application/json"
				}
			})

			document.getElementById(`tr-${event.target.parentElement.dataset.id}`).remove()
		}
	}

})