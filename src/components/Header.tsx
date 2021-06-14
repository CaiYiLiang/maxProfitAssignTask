import { Typography, Layout } from "antd";
import styled from "styled-components";

const AppHeader = styled(Layout.Header)`
  padding: 1rem 2rem;
  display: flex;
  height: 10vh;
`;
const Title = styled(Typography.Title)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  color: #fafafa !important;
`;

interface IHeader {
  appTitle?: string | undefined;
}

export const Header: React.FC<IHeader> = ({ appTitle }) => (
  <AppHeader>
    <Title level={2}>{appTitle || ""}</Title>
  </AppHeader>
);
