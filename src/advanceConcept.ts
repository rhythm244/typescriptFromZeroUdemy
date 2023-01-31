//intersections type

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Thong",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinealbe3 = string | number;
type Numeric = number | boolean;
type Universal = Combinealbe & Numeric;

//Type Guard
function add7(n1: Combinealbe3, n2: Combinealbe3): Combinealbe3 {
  if (typeof n1 === "string" || typeof n2 === "string") {
    return n1.toString() + n2.toString();
  }

  return n1 + n2;
}

type UnkonwEmployee = Employee | Admin;

function printEmployeeInfomation(emp: UnkonwEmployee) {
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

  loadCargo(amount: number) {
    console.log("Loading Cargo..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVihecle(vihecle: Vehicle) {
  vihecle.drive();
  //   if ("loadCargo" in vihecle) {
  if (vihecle instanceof Truck) vihecle.loadCargo(1000);
}

useVihecle(v1);
useVihecle(v2);
