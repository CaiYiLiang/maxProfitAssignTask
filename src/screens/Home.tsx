import { useState, useEffect } from "react";
import styled from "styled-components";
import { Layout } from "../components";
import { CarList } from "../components/CarList";
import { ICar, ICarBillStatement, IEmployee } from "./home.type";
import { Dashboard } from "../components/Dashboard";
import { carServiceAssigner } from "../utils";

const CARS_API = process.env.REACT_APP_CARS_API;
const EMPLOYEE_API = process.env.REACT_APP_EMPLOYEE_API;

const CardsWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-around;
`;

interface CardProps {
  readonly topColor?: string;
}

const Cards = styled.div<CardProps>`
  background: rgb(255, 255, 255, 0.8);
  width: 40%;
  border-radius: 5px;
  box-shadow: 0px 30px 40px -20px hsl(229deg 6% 66%);
  padding: 20px;
  margin: 20px;
  border-top: 3px solid ${(props) => props.topColor || "hsl(180deg 56% 52%)"};
`;

export const Home: React.FC = () => {
  const [cars, setCars] = useState<Array<ICar> | null>();
  const [employees, setEmployees] = useState<Array<IEmployee> | null>();
  const [carBillStatement, setCarBillStatement] =
    useState<Array<ICarBillStatement> | null>();
  const [profit, setProfit] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      if (CARS_API) {
        const fetchResponse = await fetch(CARS_API || "");
        const carsData = await fetchResponse.json();
        setCars(carsData);
      }
      if (EMPLOYEE_API) {
        const fetchResponse = await fetch(EMPLOYEE_API || "");
        const employeesData = await fetchResponse.json();
        setEmployees(employeesData);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (cars && employees) {
      const result = carServiceAssigner(cars, employees);
      const [sortedCarsBillStatement, profit] = result as [
        Array<ICarBillStatement>,
        number
      ];
      setCarBillStatement(sortedCarsBillStatement);
      setProfit(profit);
    }
  }, [cars, employees]);

  console.log("cars", cars);
  console.log("employees", employees);
  console.log("cars- json", JSON.stringify(cars));

  return (
    <Layout appTitle="Parking Service Dashboard">
      <CardsWrapper>
        <Cards>{cars && <CarList cars={cars} />}</Cards>
        <Cards topColor="hsl(212, 86%, 64%)">
          {employees && carBillStatement && (
            <Dashboard
              employees={employees}
              profit={profit}
              carBillStatement={carBillStatement}
            />
          )}
        </Cards>
      </CardsWrapper>
    </Layout>
  );
};
