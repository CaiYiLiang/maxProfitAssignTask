/**
 * * Responsible: assign the workload equally between the two employees in a way that favours profit.
 *
 * ! Parking rate: Small cars - $25, large vehicles - $35
 * ! Fuel rate: Every car with 10% or less fuel, will be refueled to maximum capacity - $1.75/litre
 * ! Commission rate: Employee A - 11%, Employee B - 15%
 *
 */

import { ICar, IFuel, IEmployee } from "../screens/home.type";

export const getParkingRate = (carSize: string) => {
  if (carSize === "large") {
    return 35;
  }
  return 25;
};

export const isRequiredReFuel = (currentLevel: number, requiredLevel: number) =>
  currentLevel <= requiredLevel;

export const calReFuelRate = (refuel: number, unitPrice: number) =>
  refuel * unitPrice;

export const getReFuelRate = (
  fuelInfo: IFuel,
  requireReFuelLevel = 0.1,
  fuelUnitPrice = 1.75
) => {
  const { capacity, level } = fuelInfo;
  let refuelRate = 0;
  let refuelAmount = 0;

  if (isRequiredReFuel(level, requireReFuelLevel)) {
    const currentFuelLevel = capacity * level;
    refuelAmount = capacity - currentFuelLevel;
    refuelRate = calReFuelRate(refuelAmount, fuelUnitPrice);
    // console.log(
    //   `car: refuelAmount - ${refuelAmount}, refuelRate - ${refuelRate}`
    // );
  }

  return [refuelRate, refuelAmount];
};

export const getCarServiceRate = (car: ICar) => {
  const { size, fuel } = car;
  const parkingRate = getParkingRate(size);
  const [fuelRate, fuelAdded] = getReFuelRate(fuel);
  const totalRate = parkingRate + fuelRate;
  // console.log(
  //   `car: parkingRate - ${parkingRate}, fuelRate - ${fuelRate}, totalRate - ${totalRate}`
  // );
  return [parseFloat(totalRate.toFixed(2)), fuelAdded];
};

export const getAllCarsBillStatement = (cars: Array<ICar>) => {
  const allCarsBillStatement = cars.reduce((result: any, currentCar: ICar) => {
    const [carServiceRate, fuelAdded] = getCarServiceRate(currentCar);
    const { licencePlate, size } = currentCar;
    return [
      ...result,
      { licencePlate, price: carServiceRate, fuelAdded, size },
    ];
  }, [] as ICar[]);

  // console.log("allCarsRate", allCarsBillStatement);
  return allCarsBillStatement;
};

export const carServiceAssigner = (
  cars: Array<ICar>,
  employees: Array<IEmployee>
) => {
  if (cars.length > 0) {
    const allCarsBillStatement = getAllCarsBillStatement(cars);
    const sortedCarsBillStatement = allCarsBillStatement.sort(
      (carA, carB) => carA.price - carB.price
    );

    const staffCapacity = employees.length;
    const sortedEmployees = employees.sort(
      (employeeA, employeeB) => employeeB.commission - employeeA.commission
    );

    const assignWorkload = Math.round(
      sortedCarsBillStatement.length / staffCapacity
    );
    let extraWorkload =
      sortedCarsBillStatement.length - assignWorkload * staffCapacity;
    // console.log("assignWorkload", assignWorkload);
    // console.log("extraWorkload", extraWorkload);
    // console.log("------");

    let profit = 0;
    let startIdx = 0;

    for (let i = 0; i < staffCapacity; i++) {
      const extraWorkloadRequired = extraWorkload > 0 ? 1 : 0;
      const endIdx =
        startIdx + assignWorkload + extraWorkloadRequired >=
        sortedCarsBillStatement.length
          ? sortedCarsBillStatement.length
          : startIdx + assignWorkload + extraWorkloadRequired;
      for (let k = startIdx; k < endIdx; k++) {
        sortedCarsBillStatement[k].employee = sortedEmployees[i].employee;
        const deductedCommissionRate =
          sortedCarsBillStatement[k].price -
          sortedCarsBillStatement[k].price * sortedEmployees[i].commission;
        profit += deductedCommissionRate;
        // console.log("sortedCarsRate", sortedCarsBillStatement[k]);
      }
      extraWorkload--;
      startIdx = endIdx;
    }

    // console.log("profit", parseFloat(profit.toFixed(2)));
    return [sortedCarsBillStatement, profit];
  }
};

// console.log("***************************");
// const employees = [
//   { employee: "A", commission: 0.11 },
//   { employee: "B", commission: 0.15 },
//   { employee: "C", commission: 0.12 },
// ];
// console.log("getAllCarsRate", carServiceAssigner(data, employees));
// console.log("***************************");
