import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
const { Header, Sider, Content } = Layout;
const LayoutPage = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const pageName = window.location;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <h1 className="logo">AS-CRUD</h1>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pageName.pathname]}
          items={[
            {
              key: "/teacher",
              icon: <UserOutlined />,
              label: <Link to={"/teacher"}>Teacher</Link>,
            },
            {
              key: "/student",
              icon: <TeamOutlined />,
              label: <Link to={"/student"}>Students</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutPage;
