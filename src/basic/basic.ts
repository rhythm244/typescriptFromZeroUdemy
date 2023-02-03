//object

const logger = () => {
  const userData: {
    username: string;
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    address: string[];
  } = {
    username: "Thong",
    id: "rwge;agndfnvierpjngoesge",
    firstName: "wasawat",
    lastName: "bourperk",
    birthDate: new Date("1995-09-24"),
    address: ["65/110 vistavile", "poemsin16"],
  };

  //enum
  enum Role {
    ADMIN, //0
    READ_ONLY, //1
    EDITOR, //2
  }

  console.log(userData);

  return 0;
};

//union example
function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
    return result;
  } else {
    result = input1.toString() + input2.toString();
    return result;
  }
}

const combineAges = combine(30, 20);

// console.log(combineAges);

//Literal Type
function combineLiteral(
  input1: number | string,
  input2: number | string,
  resultConversion: "as-number" | "as-text"
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
    return result;
  } else {
    result = input1.toString() + input2.toString();
    return result;
  }
}

//Type Aliase -- use for reuseable
type Combinealbe = number | string;
type ConversionDecriptor = "as-number" | "as-string";

//type aliase - return type

function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log("Result: " + num);
}

printResult(add(5, 12));

//เป็นการบอกว่า combineValues สามารถ assign function ที่รับค่า number2 ค่า แล้ว return number เท่านั้น
let combineValues: (n1: number, n2: number) => number;

combineValues = add;

//function type callback
function addAndHandler(
  n1: number,
  n2: number,
  callback: (num: number) => void
) {
  const result = n1 + n2;
  callback(result);
}

addAndHandler(10, 20, (result) => {
  console.log(result);
});

//type unknown -- need to if check
//unknown จะ more stric than any
let userInput: unknown;
let userName: string;
userInput = 5;
userInput = "Max";

//ถ้าไม่ check ว่าเป็น string จริงๆจึงจะทำการ assign ค่าได้
if (typeof userInput === "string") {
  userName = userInput;
}

//type never ส่วนมากจะมากลับ function ที่ throw error
function gernerateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

function test() {
  console.log('test')
}
