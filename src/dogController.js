class DogController {
  constructor(dogs) {
    this.dogs = dogs;
  }

  editDog() {}

  render() {
    this.dogs.then(json =>
      json.forEach(dog => {
        `<tr>
          <td>${dog.name}</td>
          <td>${dog.breed}</td>
          <td>${dog.sex}</td>
          <td>
            <button>Edit</button>
          </td>
      </tr>`;
      })
    );
  }
}
