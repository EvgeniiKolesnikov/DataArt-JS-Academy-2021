// Kolesnikov E. A.
"use strict";

class Worker {
  // constructor - default ================
  // constructor(name, surname) {
  //   this.name = name;
  //   this.surname = surname;
  // }

  // constructor - simulated overload =====
  constructor(name, surname) {
    if (surname == undefined) {
      const [namePiece, surnamePiece] = name.split(" ");
      this.name = namePiece;
      this.surname = surnamePiece == undefined ? "Unknown" : surnamePiece;
    } else {
      this.name = name;
      this.surname = surname;
    }
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  // setFullName(fullName) {
  //   const [name, surname] = fullName.split(' ');
  //   this.name = name;
  //   this.surname = surname;
  // }
}

class Developer extends Worker {
  constructor(name, surname) {
    super(name, surname);
  }
}

class Tester extends Worker {
  constructor(name, surname) {
    super(name, surname);
  }
}

class Project {
  constructor() {
    this.developers = [];
    this.testers = [];
  }
  addDeveloper(developer) {
    this.developers.push(Object.values(developer).join(" "));
  }
  addTester(tester) {
    this.testers.push(Object.values(tester).join(" "));
  }

  // for Google Сonsole 1 ==================
  getTeam() {
    return {
      developers: this.developers.slice(),
      testers: this.testers.slice()
    };
  }

  // for Google Сonsole 2 ==================
  // getTeam() {
  //   return JSON.parse(JSON.stringify(this));
  // }

  // getTeam() {
  //   return this;
  // }
}

const superPuper = new Project();
const dev1 = new Developer("Will", "Smith");
const dev2 = new Developer("John", "Doe");
const dev3 = new Developer("Chris Pratt");
const dev4 = new Developer("Arnold");
const test1 = new Tester("Alex", "Green");

superPuper.addDeveloper(dev1);
superPuper.addDeveloper(dev2);
superPuper.addDeveloper(dev3);
superPuper.addTester(test1);

console.log("dev1 = ", dev1.getFullName()); // "Will Smith"
console.log("dev2 = ", dev2.getFullName()); // "John Doe"
console.log("dev3 = ", dev3.getFullName()); // "Chris Pratt"
console.log("test1 = ", test1.getFullName()); // "Alex Green"

console.log("superPuper.getTeam() = ", superPuper.getTeam());
superPuper.addDeveloper(dev4);
console.log("superPuper.getTeam() = ", superPuper.getTeam());
