class Dog {
  //needs a constructor and functions... whatever a dog can do really.

  constructor(id, name, breed, sex){
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.sex = sex;
  }//constructor

  /*getID(){
    return this.id;
  }
  setID(id){
    this.id = id;
  }*/ //dont need this due to us never being able to edit ID
  // make some getters n' setters for smoooothness... :)
  getName(){
    return this.name;
  }//getName
  setName(name){
    this.name = name;
  }//setName
  getBreed(){
    return this.breed;
  }//getBreed
  setBreed(breed){
    this.breed = breed;
  }//setBreed
  getSex(){
    return this.sex;
  }//getSex
  setSex(sex){
    this.sex = sex;
  }//setSex
}//dog class
