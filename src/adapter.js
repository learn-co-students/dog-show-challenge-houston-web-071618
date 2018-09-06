const DOGS_API = 'http://localhost:3000/dogs'
class Adapter {
  
  static async getAllDogs() {
    let result = await fetch(DOGS_API)
    let dogs = await result.json()
    return dogs.map(dog => ({
      id: dog.id,
      name: dog.name,
      breed: dog.breed,
      sex: dog.sex,
    }))
  }
  
  static updateDog(dogObject) {
    fetch(`${DOGS_API}/${dogObject.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: dogObject.name,
        breed: dogObject.breed,
        sex: dogObject.sex
      })
    })
  }
}