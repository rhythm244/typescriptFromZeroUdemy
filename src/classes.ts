abstract class Department {
  // private name: string;
  // private employees: string[] = [];
  private employees: string[] = []; //ถ้าในการสร้าง instance ไม่ต้องส่งค่ามาก็ไม่ต้องเอาไปไว้ใน constructor
  protected thong: number = 0; //สามารถใช้ใน inheritance อื่นได้ด้วย ต่างจาก Private ที่สามารถใช้ได้เฉพาะใน Base Class นี้เท่านั้น

  constructor(protected readonly id: string, private name: string) {
    // this.name = n;
  }

  // abstract describe(this: Department): void;
  describe(this: Department): void {
    console.log("This is Department Class.");
  }

  static createEmployee(name: string) {
    return { name: name };
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfomation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admin: string[] = [];
  constructor(id: string, admin: string[]) {
    super(id, "IT"); //ส่งค่าไปยัง Class อันเดิม
    this.admin = admin;
  }
}

class AccountingDepartment extends Department {
  private static instance: AccountingDepartment; //ใช้ร่วมกับกรณี private constructor

  //singleton and private constructor
  private constructor(id: string, private report: string[]) {
    super(id, "Accounting");
  }

  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }
}

// const accounting = new Department("xyz", "Accounting");
const accounting = new ITDepartment("xyz", ["thong"]);

const accounting2 = AccountingDepartment.getInstance();
console.log(accounting2);

accounting.addEmployee("Max");
accounting.addEmployee("Menu");

// accounting.employees(['anna']) //if private it can not access by this.

accounting.describe();
accounting.printEmployeeInfomation();
// const accountingCopy = { name: "Dummy", describe: accounting.describe };

console.log(accounting);
