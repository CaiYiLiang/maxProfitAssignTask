import { Typography, List } from "antd";
import { CarTwoTone, SmileTwoTone } from "@ant-design/icons";
import styled from "styled-components";
import { ICar, ICarBillStatement } from "../screens/home.type";

const { Title } = Typography;

const CardListWrapper = styled.div`
  height: 90%;
  overflow: auto;
`;

const CardListContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoItem = styled.div``;

interface ICarList {
  cars: Array<ICar> | Array<ICarBillStatement>;
  headerTitle?: string;
}

export const CarList: React.FC<ICarList> = ({ cars }) => {
  const isTaskAssignList = !!cars[0].employee;
  const title = isTaskAssignList ? "Task board" : "Cars";
  const icon = isTaskAssignList ? <SmileTwoTone /> : <CarTwoTone />;
  return (
    <>
      <Title level={2}>{title}</Title>
      <CardListWrapper>
        <List
          size="small"
          dataSource={cars}
          renderItem={(item) => (
            <List.Item key={item.licencePlate}>
              <List.Item.Meta
                avatar={icon}
                title={
                  isTaskAssignList
                    ? `Service Staff: ${item.employee}`
                    : `${item.licencePlate} - size: ${item.size}`
                }
                description={
                  <CardListContentWrapper>
                    {isTaskAssignList && (
                      <InfoItem>
                        {`Car: ${item.licencePlate} - size: ${item.size}`}
                      </InfoItem>
                    )}
                    {!isTaskAssignList && item.fuel && (
                      <InfoItem>
                        {`Fuel capacity: ${item.fuel.capacity} Current level: ${item.fuel.level}`}
                      </InfoItem>
                    )}

                    {isTaskAssignList && (
                      <InfoItem>
                        {`Fuel added: ${item.fuelAdded} - Bill: ${item.price}`}
                      </InfoItem>
                    )}
                  </CardListContentWrapper>
                }
              />
            </List.Item>
          )}
        />
      </CardListWrapper>
    </>
  );
};
