class Department {
  name: string;

  constructor(n: string) {
    this.name = n;
  }

  describe(this: Department): void {
    console.log("Department: " + this.name);
  }
}

const accounting = new Department("Accounting");

const accountingCopy = { name: "Dummy", describe: accounting.describe };

accounting.describe();
