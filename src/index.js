document.addEventListener('DOMContentLoaded', () => {

	const dogsURL = 'http://localhost:3000/dogs'
	const parsedJSON = response => response.json()
	const registeredDogsTable = document.querySelector('#table-body')

	fetch(dogsURL)
		.then(parsedJSON)
		.then(function showDogs(dogs) {
			dogs.forEach(dog => {
				registeredDogsTable.innerHTML += `
					<tr>
						<td class='padding center'>${dog.name}</td> 
						<td class='padding center'>${dog.breed}</td> 
						<td class='padding center'>${dog.sex}</td> 
						<td class='padding center'><button id="${dog.id}">Edit</button></td>
					</tr>
				`
			})
		})


	registeredDogsTable.addEventListener('click', editDog)

	function editDog(event) {
		event.preventDefault();
		
		fetch(dogsURL + '/' + `${dog.id}`, {

		})
	}


})