const button = document.querySelector("button")!;

function clickHandler(message: string) {
  console.log("Clicked! " + message);
}

if (button) {
  button.addEventListener(
    "click",
    clickHandler.bind(null, "Hello thong You are ")
  );
}

type combine = number | string;

const printOutput: (a: combine) => combine = (output) => {
  console.log(output);
  return output;
};

const DJnui: (message: string) => string = (message: string) => {
  return message;
};

type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}

// Speard operator
const hobbies = ["Sport", "Cooking"];
const activeHobbies = ["Hiking"];

activeHobbies.push(...hobbies);

const person = {
  firstName: "Max",
  age: 30,
};

const copiesPerson = person; //แบบนี้จะจะเป็นการ Point ไปที่ Address ของ Person
const copiesPersonTwo = { ...person }; //perfect copy

//Rest Operator
const addTwo = (...numbers: number[]) => {
  return numbers.reduce((curResult, curValue) => {
    return curResult + curValue;
  }, 0);
};

const addNumbers = printOutput(addTwo(5, 10, 2, 3, 7));

//array andobject destructure
const [hobby1, hobby2, ...rest] = hobbies;

// console.log(hobby1, hobby2) // not remove from old array

const { firstName: userName2, age } = person;

console.log(userName2, age);
