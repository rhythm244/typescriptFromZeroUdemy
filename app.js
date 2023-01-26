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
//union
function combine(input1, input2) {
    var result;
    if (typeof (input1 === "number") && typeof (input2 === "number")) {
        result = input1 + input2;
        return result;
    }
    else {
        result = input1.toString() + input2.toString();
        return result;
    }
}
var combineAges = combine(30, 20);
console.log(combineAges);
