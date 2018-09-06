document.addEventListener('DOMContentLoaded', () => {

  let tableBody = document.getElementById('table-body')
  let inputForm = document.getElementById('dog-form')

  fetch('http://localhost:3000/dogs')
    .then(re => re.json())
    .then(addDogsToPage)

  function addDogsToPage(dogs) {
    dogs.forEach(dog => {
      tableBody.innerHTML += `
        <tr><td>${dog.name}</td> <td>${dog.breed}</td> <td>${dog.sex}</td> <td><button id='${dog.id}'>Edit</button></td></tr>`
    })
  }

  tableBody.addEventListener('click', function(e) {
    if (e.target.innerText === 'Edit') {
      const dogId = e.target.id
      const dogRow = e.target.parentElement.parentElement.children
      editDog(dogId, dogRow)
    }
  })

  function editDog(dogId, dogRow) {
    inputForm.children[0].value = dogRow[0].innerText
    inputForm.children[1].value = dogRow[1].innerText
    inputForm.children[2].value = dogRow[2].innerText
    inputForm.addEventListener('submit', e => updateDatabase(e, dogId))
  }

  function updateDatabase(e, dogId) {
    const dogName = e.target.children[0].value
    const dogBreed = e.target.children[1].value
    const dogSex = e.target.children[2].value

    fetch(`http://localhost:3000/dogs/${dogId}`, {
      method : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: dogId,
        name: dogName,
        breed: dogBreed,
        sex: dogSex
      })
    })
    .then(res => res.json())
  }

})
