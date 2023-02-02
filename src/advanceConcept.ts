//intersections type
//-------------------------------------------------------------------
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Thong",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinealbe3 = string | number;
type Numeric = number | boolean;
type Universal = Combinealbe & Numeric;

//Type Guard
function add7(n1: Combinealbe3, n2: Combinealbe3): Combinealbe3 {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }

  return n1 + n2;
}

type UnkonwEmployee = Employee | Admin;

function printEmployeeInfomation(emp: UnkonwEmployee) {
  console.log(`Name ${emp.name}`);

  if ("privileges" in emp) {
    console.log(`Privileage ${emp.privileges}`);
  }
  if ("startDate" in emp) {
    console.log(`Start Date:  ${emp.startDate}`);
  }
}

printEmployeeInfomation(e1);

class Car {
  drive() {
    console.log("Driving.....");
  }
}

class Truck {
  drive() {
    console.log("Driving truck.....");
  }

  loadCargo(amount: number) {
    console.log("Loading Cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVihecle(vihecle: Vehicle) {
  vihecle.drive();
  //   if ("loadCargo" in vihecle) {
  if (vihecle instanceof Truck) vihecle.loadCargo(1000);
}

useVihecle(v1);
useVihecle(v2);

//-------------------------------------------------------------------
//Discriminated Unions
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

//แบบนี้สามารถทำได้
// function moveAnimal(animal: Animals) {
//   if ("flyingSpeed" in animal) {
//     console.log("Moving with speed: " + animal.flyingSpeed);
//   }
// }

//แต่แบบนี้ทำไม่ได้ เพราะว่า interface Bird JS ตอน runtime มันไม่เข้าใจ
// function moveAnimal2(animal: Animals) {
//   if (animal instanceof Bird) {
//     console.log("Moving with speed: " + animal.flyingSpeed);
//   }
// }

//Discriminated Unions
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//-------------------------------------------------------------------
//Type Casting
const paragraph = document.getElementById("message-output");
// const userInputElement = <HTMLInputElement>(
//   document.getElementById("user-intput")
// );

const userInputElement = document.getElementById(
  "user-intput"
) as HTMLInputElement;

userInputElement.value = "Hi there";

// 87. index properties
interface ErrorContainer {
  //{ email: 'Not a valid email', username: 'Must start with character'}
  [props: string]: string; //มีประโยชน์ตอนที่ไม่รู้ว่าจะมีกี่ Key และมันชื่อว่าอะไร
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  userName: "Must start with character",
};

console.log(errorBag);

// 88. Function Overload
type Combinealbe4 = string | number;
type Numeric2 = number | boolean;
type Universal2 = Combinealbe & Numeric;

//Function overload เป็นการบอก TS ว่าฟังก์ชั่นนี้จะ return อะไรออกมาเพราะมันเป็น union type ในตอนแรก
function add8(n1: number, n2: number): number;
function add8(n1: string, n2: string): string;
function add8(n1: Combinealbe4, n2: Combinealbe4): Combinealbe4 {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }

  return n1 + n2;
}

// const result = add8("Max", "Schawt");
const result = add8(1, 5);

// 89. Optional Chaning
const fetchUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company." },
};

console.log(fetchUserData?.job?.title);

// 90. nullish coalescing
const userInput2 = "";
const storedData = userInput2 || "Default"; //ปัญหาของการใช้แบบนี้คือ ถ้า userInput2 เป็น '' มันจะใช้ค่าด้านหลัง ||

const storedData2 = userInput2 ?? "Default555";
console.log(storedData2);
