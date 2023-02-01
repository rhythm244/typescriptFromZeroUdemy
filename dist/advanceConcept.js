"use strict";
const e1 = {
    name: "Thong",
    privileges: ["create-server"],
    startDate: new Date(),
};
function add7(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
function printEmployeeInfomation(emp) {
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
    loadCargo(amount) {
        console.log("Loading Cargo..." + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVihecle(vihecle) {
    vihecle.drive();
    if (vihecle instanceof Truck)
        vihecle.loadCargo(1000);
}
useVihecle(v1);
useVihecle(v2);
function moveAnimal(animal) {
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
const paragraph = document.getElementById("message-output");
const userInputElement = document.getElementById("user-intput");
userInputElement.value = "Hi there";
