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

