const dogTable = document.getElementById("table-body");
const form = document.getElementById("dog-form");

document.addEventListener('DOMContentLoaded', () => {

	showDogs();

	dogTable.addEventListener("click", clickedEdit)

	function clickedEdit(event) {
		if (event.target.dataset.id) {
			addDogToForm(event)
		}
	}

	function addDogToForm(event) {
		let row = event.target.parentElement.parentElement.children;
		form.children[0].value = row[0].innerText
		form.children[1].value = row[1].innerText
		form.children[2].value = row[2].innerText
		form.children[3].dataset.id = row[3].children[0].dataset.id
	}

	form.addEventListener("submit", function(event) {
		event.preventDefault();

		const name = form.children[0].value;
		const breed = form.children[1].value;
		const sex = form.children[2].value;
		const id = form.children[3].dataset.id;

		editDog(id, name, breed, sex)
			.then(resp => resp.json())
			.then(dog => {
				document.getElementById(dog.id).innerHTML = `
				<tr>
					<td>${dog.name}</td> 
					<td>${dog.breed}</td> 
					<td>${dog.sex}</td> 
					<td><button data-id=${dog.id}>Edit</button></td>
				</tr>
				`
			})
	})
})


function showDogs() {
	fetch("http://localhost:3000/dogs")
		.then(resp => resp.json())
		.then(dogs => addDogsToPage(dogs))
}

function addDogsToPage(dogs) {
	dogs.forEach(function(dog) {
		addDogToTable(dog);
	})
}

function addDogToTable(dog) {
	const newDogTr = document.createElement("tr");
	newDogTr.id = dog.id 
	newDogTr.innerHTML = `
	<tr>
		<td>${dog.name}</td> 
		<td>${dog.breed}</td> 
		<td>${dog.sex}</td> 
		<td><button data-id=${dog.id}>Edit</button></td>
	</tr>
	`
	dogTable.append(newDogTr);
}

function editDog(id, name, breed, sex) {
	return fetch(`http://localhost:3000/dogs/${id}`, {
		method: "PATCH",
		body: JSON.stringify({
			name: name,
			breed: breed,
			sex: sex
		}),
		headers: {
			"Content-Type": "application/json"
		}
	})
}