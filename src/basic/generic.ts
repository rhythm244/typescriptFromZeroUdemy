// const names = ["Max", "Manuel"];
const names: Array<string> = [];

const promise = new Promise<string>((resolve, reject) => {
  setTimeout(() => {
    resolve("This is done!");
  }, 2000);
});

promise.then((res) => console.log(res));

// own Generic
function merge<T extends object, U extends object>(a: T, b: U) {
  return Object.assign(a, b);
}

console.log(merge({ name: "Max" }, { age: 30 }));

let mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
// let mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });

console.log(mergedObj);

//96. Working with Constraints
//T กับ U ในตอนแรกไม่มี extends object ทำให้สามารถส่งค่าอะไรไปก็ได้ แต่เราต้องการรวม Object.assing เมื่อ JS เห็นว่ามันไม่ใช่ object มันเลยเป็น Bug ที่ซ่อนอยู่ ซึ่ง TS ไม่เห็น เลยต้องเพิ่ม Key word extends เข้าไปบอกให้รู้ว่า จะรับแค่ object นะ
let mergedObj2 = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });

console.log(mergedObj2);

//97. Another Generic Function

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 0) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

//ค่าที่ส่งเข้าไปในฟังก์ชั่นต้องมี properties *length*
console.log(countAndDescribe("Hi there"));

//98. The "keyof" Constraint โคตรงง
function extraAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

console.log(extraAndConvert({ name: "Max" }, "name"));

//99. Generic Classes
class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) return;
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItem());

const numberStoage = new DataStorage<number>();

const objStorage = new DataStorage<object>();

objStorage.addItem({ name: "Max" });
objStorage.addItem({ name: "Manu" });
objStorage.removeItem({ name: "Max" });
console.log(objStorage.getItem());

//101. Generic Utility Types
interface CourseGoal {
  title: string;
  desc: string;
  completeUnit: Date;
}

function createCoruseGoal(title: string, desc: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.desc = desc;
  courseGoal.completeUnit = date;

  return courseGoal as CourseGoal;
}

const names5: Readonly<string[]> = ["Max", "Manu"];
// names5.push("Anna");

//102. Generic Types vs Union Types
