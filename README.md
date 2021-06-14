## Parking Service System

### Requirement

- Responsible: assign the workload equally between the two employees in a way that favours profit.

- Parking rate: Small cars - $25，large vehicles - $35
- Fuel rate: Every car with 10% or less fuel, will be refueled to maximum capacity - $1.75/litre
- Commission rate: Employee A - 11%, Employee B - 15%

### Solutions

Two solutions on Parking Service System, one focuses on front end, another one is implemented with Deno, which is a new experiment on this powerful backend framework.

- [Parking Service dashboard](https://max-profit-assign-task.vercel.app/): React, Typescript
- [Parking Service CLI](https://github.com/CaiYiLiang/maxProfitAssignTask-deno): Deno, Typescript

#### Parking Service dashboard

- Play around with it
  - [Click to check the demo](https://max-profit-assign-task.vercel.app/)
  - Optionally change the `cars.json` || `employees.json` in `public` file. Run `yarn start`
- TODO:
  - Responsive design.
  - Enable edit feature on `cars` and `employees`.
  - Dynamic car list instead a fixed array.

##### Screen

![screen capture](./public/parkingSystem.png)
