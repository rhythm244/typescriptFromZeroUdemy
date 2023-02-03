"use strict";
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is done!");
    }, 2000);
});
promise.then((res) => console.log(res));
function merge(a, b) {
    return Object.assign(a, b);
}
console.log(merge({ name: "Max" }, { age: 30 }));
let mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj);
let mergedObj2 = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj2);
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length === 0) {
        descriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("Hi there"));
function extraAndConvert(obj, key) {
    return obj[key];
}
console.log(extraAndConvert({ name: "Max" }, "name"));
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1)
            return;
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItem() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItem());
const numberStoage = new DataStorage();
const objStorage = new DataStorage();
objStorage.addItem({ name: "Max" });
objStorage.addItem({ name: "Manu" });
objStorage.removeItem({ name: "Max" });
console.log(objStorage.getItem());
function createCoruseGoal(title, desc, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.desc = desc;
    courseGoal.completeUnit = date;
    return courseGoal;
}
const names5 = ["Max", "Manu"];
