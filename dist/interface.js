"use strict";
console.log("interface");
class Person {
    constructor(n) {
        this.name = n;
        this.age = 33;
    }
    greet(phase) {
        console.log(`${phase} ${this.name}`);
    }
}
let user1;
user1 = new Person("Thong");
console.log(user1.name);
