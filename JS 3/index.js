// Kolesnikov E. A.
"use strict";

class Worker {
  // constructor - simulated overload =====
  constructor(name, surname, age, salary, ...args) {
    // тут можно придумать разные функции для имитации перегрузки
    this.setNewWorker(name, surname, age, salary, ...args);
  }

  setNewWorker(name, surname, age, salary, ...args) {
    if (surname == undefined) {
      const [namePiece, surnamePiece] = name.split(" ");
      this.name = namePiece;
      this.surname = surnamePiece == undefined ? "Unknown" : surnamePiece;
    } else {
      this.name = name;
      this.surname = surname;
    }
    if (age !== undefined) this.age = age;
    if (salary !== undefined) this.salary = salary;
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }

  info() {
    return `${Object.values(this).join(" ")}`;
    // return this; // или так
  }
}

class Developer extends Worker {}

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
    this.developers.push(developer);
  }
  addTester(tester) {
    this.testers.push(tester);
  }
  // for Google Сonsole 1 ==================
    getTeam() {
      return {
        developers: this.developers.map(item =>
          Object.values(item)
            .filter((item, i) => i < 2)
            .join(" ")
        ),
        testers: this.testers.map(item => Object.values(item).join(" "))
      };
    }
  
  // getTeam() {
  //   return {
  //     developers: this.developers.forEach(item =>
  //       Object.values(item)
  //       .filter((item, i) => i < 2)
  //       .join(" ")
  //     ),
  //     testers: this.testers.map(item => Object.values(item).join(" "))
  //   };
  // }
}

const superPuper = new Project();
const dev1 = new Developer("Will", "Smith");
const dev2 = new Developer("John", "Doe", 20, "7000$", "FrontEnd", "WeekEnd");
const dev3 = new Developer("Chris Pratt");
const dev4 = new Developer("Arnold");
const test1 = new Tester("Alex", "Green");

console.log("dev1 = ", dev1.getFullName()); // "Will Smith"
console.log("dev2 = ", dev2.info()); // "John Doe 20 7000$"
console.log("dev3 = ", dev3.getFullName()); // "Chris Pratt"
console.log("dev4 = ", dev4.getFullName()); // "Arnold Unknown"
console.log("test1 = ", test1.getFullName()); // "Alex Green"

superPuper.addDeveloper(dev1);
superPuper.addDeveloper(dev2);
superPuper.addDeveloper(dev3);
superPuper.addTester(test1);
console.log(superPuper);
console.log("superPuper.getTeam() = ", superPuper.getTeam());

dev1.setNewWorker("Jaden", "Smith");
superPuper.addDeveloper(dev4);
superPuper.addDeveloper(new Developer("Mr. Incognito"));

console.log("superPuper.getTeam() = ", superPuper.getTeam());
console.log(superPuper);