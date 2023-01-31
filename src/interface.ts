console.log("interface");

//structure of object
//clearer than type
//type มันจะ Flexible มากกว่า

interface Named {
  readonly name?: string;
  outputName?: string; //optional parameters
}

interface Greetable extends Named {
  greet(phase: string): void;
}

//interface สามารถใช้ร่วมกับ Class ได้
class Person implements Greetable {
  name?: string;
  age: number;
  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
    this.age = 33;
  }

  greet(phase: string): void {
    console.log(`${phase} ${this.name}`);
  }
}

let user1: Greetable;

user1 = new Person("Thong");
// user1.greet('Hi Hi Hi Hi')
// user1.name = 'thong'; ทำไม่ได้เพราะ interface name เป็น readonly

console.log(user1.name);

interface AddFn {
  (a: number, b: number): number;
}

let addFn: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};
