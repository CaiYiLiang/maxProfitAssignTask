import { Typography, Layout as AntdLayout } from "antd";
import styled from "styled-components";
import { Header, Footer, Content } from ".";

const AppLayout = styled(AntdLayout)`
  height: 100vh;
  width: 100%;
  color: hsl(234, 12%, 34%);
`;

interface ILayout {
  appTitle?: string;
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ appTitle, children }) => (
  <AppLayout>
    <Header appTitle={appTitle} />
    <Content>{children}</Content>
    <Footer />
  </AppLayout>
);
