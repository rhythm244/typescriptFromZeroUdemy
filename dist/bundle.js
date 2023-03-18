"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var App;
(function (App) {
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = (document.getElementById(templateId));
            this.hostElement = document.getElementById(hostElementId);
            const importNode = document.importNode(this.templateElement.content, true);
            this.element = importNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
var App;
(function (App) {
    function autobind(_, _2, descriptor) {
        console.log(descriptor);
        const originMethod = descriptor.value;
        const adjdDescriptor = {
            configurable: true,
            get() {
                const boundFn = originMethod.bind(this);
                return boundFn;
            },
        };
        return adjdDescriptor;
    }
    App.autobind = autobind;
})(App || (App = {}));
var App;
(function (App) {
    function validate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid =
                isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    App.validate = validate;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            console.log(this.listeners);
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance)
                return this.instance;
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPage) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPage, App.ProjectStatus.Active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    class ProjectInput extends App.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        getherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
            };
            if (!App.validate(titleValidatable) ||
                !App.validate(descriptionValidatable) ||
                !App.validate(peopleValidatable)) {
                alert("Invalid input, please try again!");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.getherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                App.projectState.addProject(title, desc, people);
                console.log(title, desc, people);
            }
        }
        clearInput() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        renderContent() { }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
    }
    __decorate([
        App.autobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            console.log(event.dataTransfer.getData("text/plain"));
            const prjId = event.dataTransfer.getData("text/plain");
            App.projectState.moveProject(prjId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLaeveHandler(_) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLaeveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === "active") {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    else {
                        return prj.status === App.ProjectStatus.Finished;
                    }
                });
                this.assignProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderProjects() {
            const listEl = (document.getElementById(`${this.type}-projects-list`));
            listEl.innerHTML = "";
            for (const prjItem of this.assignProjects) {
                new App.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
    }
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.autobind
    ], ProjectList.prototype, "dragLaeveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
var App;
(function (App) {
    const projectInput = new App.ProjectInput();
    const activeProjectList = new App.ProjectList("active");
    const finishedProjectList = new App.ProjectList("finished");
})(App || (App = {}));
var _a;
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
const errorBag = {
    email: "Not a valid email",
    userName: "Must start with character",
};
console.log(errorBag);
function add8(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + n2.toString();
    }
    return n1 + n2;
}
const result = add8(1, 5);
const fetchUserData = {
    id: "u1",
    name: "Max",
    job: { title: "CEO", description: "My own company." },
};
console.log((_a = fetchUserData === null || fetchUserData === void 0 ? void 0 : fetchUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput2 = "";
const storedData = userInput2 || "Default";
const storedData2 = userInput2 !== null && userInput2 !== void 0 ? userInput2 : "Default555";
console.log(storedData2);
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
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
        this.thong = 0;
    }
    describe() {
        console.log("This is Department Class.");
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInfomation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
class ITDepartment extends Department {
    constructor(id, admin) {
        super(id, "IT");
        this.admin = [];
        this.admin = admin;
    }
}
class AccountingDepartment extends Department {
    constructor(id, report) {
        super(id, "Accounting");
        this.report = report;
    }
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment("d2", []);
        return this.instance;
    }
}
const accounting = new ITDepartment("xyz", ["thong"]);
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting2);
accounting.addEmployee("Max");
accounting.addEmployee("Menu");
accounting.describe();
accounting.printEmployeeInfomation();
console.log(accounting);
const button = document.querySelector("button");
function clickHandler(message) {
    console.log("Clicked! " + message);
}
if (button) {
    button.addEventListener("click", clickHandler.bind(null, "Hello thong You are "));
}
const printOutput = (output) => {
    console.log(output);
    return output;
};
const DJnui = (message) => {
    return message;
};
function greeter(fn) {
}
const hobbies = ["Sport", "Cooking"];
const activeHobbies = ["Hiking"];
activeHobbies.push(...hobbies);
const person = {
    firstName: "Max",
    age: 30,
};
const copiesPerson = person;
const copiesPersonTwo = Object.assign({}, person);
const addTwo = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addNumbers = printOutput(addTwo(5, 10, 2, 3, 7));
const [hobby1, hobby2, ...rest] = hobbies;
const { firstName: userName2, age } = person;
console.log(userName2, age);
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
console.log("interface");
class Person {
    constructor(n) {
        if (n) {
            this.name = n;
        }
        this.age = 33;
    }
    greet(phase) {
        console.log(`${phase} ${this.name}`);
    }
}
let user1;
user1 = new Person("Thong");
console.log(user1.name);
let add5;
add5 = (n1, n2) => {
    return n1 + n2;
};
var App;
(function (App) {
    class ProjectItem extends App.Component {
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(_) {
            console.log("DragEnd");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent =
                this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        App.autobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    __decorate([
        App.autobind
    ], ProjectItem.prototype, "dragEndHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
