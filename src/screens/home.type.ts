export interface IFuel {
  capacity: number;
  level: number;
}

export interface ICar {
  [x: string]: any;
  licencePlate: string;
  size: string;
  fuel: IFuel;
}

type Employee = {
  employee: string;
};

export interface IEmployee {
  employee: Employee;
  commission: number;
}

export interface ICarBillStatement extends ICar {
  employee?: Employee;
  fuelAdded: number;
  price: number;
}
