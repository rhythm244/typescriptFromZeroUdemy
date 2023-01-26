//object
var logger = function () {
    var userData = {
        username: "Thong",
        id: "rwge;agndfnvierpjngoesge",
        firstName: "wasawat",
        lastName: "bourperk",
        birthDate: new Date("1995-09-24"),
        address: ["65/110 vistavile", "poemsin16"]
    };
    //enum
    var Role;
    (function (Role) {
        Role[Role["ADMIN"] = 0] = "ADMIN";
        Role[Role["READ_ONLY"] = 1] = "READ_ONLY";
        Role[Role["EDITOR"] = 2] = "EDITOR";
    })(Role || (Role = {}));
    console.log(userData);
    return 0;
};
//union example
function combine(input1, input2) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
        return result;
    }
    else {
        result = input1.toString() + input2.toString();
        return result;
    }
}
var combineAges = combine(30, 20);
// console.log(combineAges);
//Literal Type
function combineLiteral(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === "number" && typeof input2 === "number") {
        result = input1 + input2;
        return result;
    }
    else {
        result = input1.toString() + input2.toString();
        return result;
    }
}
//type aliase - return type
function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log("Result: " + num);
}
printResult(add(5, 12));
//เป็นการบอกว่า combineValues สามารถ assign function ที่รับค่า number2 ค่า แล้ว return number เท่านั้น
var combineValues;
combineValues = add;
//function type callback
function addAndHandler(n1, n2, callback) {
    var result = n1 + n2;
    callback(result);
}
addAndHandler(10, 20, function (result) {
    console.log(result);
});
//type unknown -- need to if check
//unknown จะ more stric than any
var userInput;
var userName;
userInput = 5;
userInput = "Max";
//ถ้าไม่ check ว่าเป็น string จริงๆจึงจะทำการ assign ค่าได้
if (typeof userInput === "string") {
    userName = userInput;
}
//type never ส่วนมากจะมากลับ function ที่ throw error
function gernerateError(message, code) {
    throw { message: message, errorCode: code };
}
