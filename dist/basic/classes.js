"use strict";
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
