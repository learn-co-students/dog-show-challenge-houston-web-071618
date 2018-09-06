const dogs = (function () {
  const state = {
    all: []
  };

  function getAllDogsInState() {
    return state.all;
  }

  function addDogToState(dog) {
    state.all.push(dog);
  }

  function findDogById(id) {
    return getAllDogsInState().find(x => x.id === id);
  }

  const obj = {
    addDog: function (dog) {
      return addDogToState(dog);
    },
    getAllDogs: function () {
      return getAllDogsInState();
    },
    getDogById: function (id) {
      return findDogById(id);
    }
  };

  return obj;
})();