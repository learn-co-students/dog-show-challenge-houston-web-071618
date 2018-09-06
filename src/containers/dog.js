class Dog {
  constructor({
    id,
    name,
    breed,
    sex
  } = {}) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
    dogs.addDog(this);
  }

  update({
    id,
    name,
    breed,
    sex
  } = {}) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
  }

  render() {
    return (`<tr><td>${this.name}</td> <td>${this.breed}</td> <td>${this.sex}</td> <td><button id="edit-${this.id}">Edit</button></td></tr>`);
  }

  static all() {
    return dogs.getAllDogs();
  }

  static findDogById(id) {
    return dogs.getDogById(id);
  }
}