"use strict";
const button = document.querySelector("button");
function clickHandler(message) {
    console.log("Clicked! " + message);
}
if (button) {
    button.addEventListener("click", clickHandler.bind(null, "Hello thong You are "));
}
const printOutput = (output) => {
    console.log(output);
    return output;
};
const DJnui = (message) => {
    return message;
};
function greeter(fn) {
}
const hobbies = ["Sport", "Cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const person = {
    firstName: "Max",
    age: 30,
};
const copiesPerson = person;
const copiesPersonTwo = Object.assign({}, person);
const addTwo = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addNumbers = printOutput(addTwo(5, 10, 2, 3, 7));
const [hobby1, hobby2, ...rest] = hobbies;
const { firstName: userName2, age } = person;
console.log(userName2, age);
