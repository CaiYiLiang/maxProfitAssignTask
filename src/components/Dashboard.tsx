import { Typography } from "antd";
import styled from "styled-components";
import { ICarBillStatement, IEmployee } from "../screens/home.type";
import { CarList } from "./CarList";

const { Title } = Typography;

const ProfitWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

interface IDashboard {
  employees: Array<IEmployee>;
  profit: number;
  carBillStatement: Array<ICarBillStatement>;
}

export const Dashboard: React.FC<IDashboard> = ({
  employees,
  profit,
  carBillStatement,
}) => (
  <>
    <CarList cars={carBillStatement} />
    <ProfitWrapper>
      <Title level={5}>Company profit: ${parseFloat(profit.toFixed(2))}</Title>
    </ProfitWrapper>
  </>
);
