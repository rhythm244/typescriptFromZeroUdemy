"use strict";
const logger = () => {
    const userData = {
        username: "Thong",
        id: "rwge;agndfnvierpjngoesge",
        firstName: "wasawat",
        lastName: "bourperk",
        birthDate: new Date("1995-09-24"),
        address: ["65/110 vistavile", "poemsin16"],
    };
    let Role;
    (function (Role) {
        Role[Role["ADMIN"] = 0] = "ADMIN";
        Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
        Role[Role["EDITOR"] = 2] = "EDITOR";
    })(Role || (Role = {}));
    console.log(userData);
    return 0;
};
function combine(input1, input2) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
        return result;
    }
    else {
        result = input1.toString() + input2.toString();
        return result;
    }
}
const combineAges = combine(30, 20);
function combineLiteral(input1, input2, resultConversion) {
    let result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
        return result;
    }
    else {
        result = input1.toString() + input2.toString();
        return result;
    }
}
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: " + num);
}
printResult(add(5, 12));
let combineValues;
combineValues = add;
function addAndHandler(n1, n2, callback) {
    const result = n1 + n2;
    callback(result);
}
addAndHandler(10, 20, (result) => {
    console.log(result);
});
let userInput;
let userName;
userInput = 5;
userInput = "Max";
if (typeof userInput === "string") {
    userName = userInput;
}
function gernerateError(message, code) {
    throw { message: message, errorCode: code };
}
function test() {
    console.log('test');
}
//# sourceMappingURL=basic.js.map