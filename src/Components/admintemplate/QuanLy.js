import React, { useEffect, useState } from "react";
import "./quanly.scss";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { myLocalStore } from "../../redux/myLocalStore";
// const { Header, Sider, Content } = Layout;

const QuanLy = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const localUser = myLocalStore.goiLocalStore("user");
    setUser(localUser);

    if (localUser === null) {
      navigate("/");
    } else if (localUser.maLoaiNguoiDung === "QuanTri") {
      // Do nothing, the component will be rendered for this case
    } else {
      navigate("/");
    }
  }, [navigate]);

  //logout
  const handleLogout = () => {
    myLocalStore.xoaLocalStore("user");
    setUser({});
    navigate("/");
  };

  if (user.maLoaiNguoiDung === "QuanTri") {
    return (
      // <Layout className='min-h-screen'>
      //   <Sider trigger={null} collapsible collapsed={collapsed}>
      //     <div className="logo-vertical">
      //       <p style={{color: "white"}}>admin</p>
      //     </div>
      //     <Menu
      //       theme="dark"
      //       mode="inline"
      //       defaultSelectedKeys={['1']}
      //       items={[
      //         {
      //           key: '1',
      //           icon: <UserOutlined />,
      //           label: 'nav 1',
      //         },
      //         {
      //           key: '2',
      //           icon: <VideoCameraOutlined />,
      //           label: 'nav 2',
      //         },
      //         {
      //           key: '3',
      //           icon: <UploadOutlined />,
      //           label: 'nav 3',
      //         },
      //       ]}
      //     />
      //   </Sider>
      //   <Layout>
      //     <Header
      //       style={{
      //         padding: 0,
      //         background: colorBgContainer,
      //       }}
      //     >
      //       <Button
      //         type="text"
      //         icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      //         onClick={() => setCollapsed(!collapsed)}
      //         style={{
      //           fontSize: '16px',
      //           width: 64,
      //           height: 64,
      //         }}
      //       />
      //     </Header>
      //     <Content
      //       style={{
      //         margin: '24px 16px',
      //         padding: 24,
      //         minHeight: 280,
      //         background: colorBgContainer,
      //       }}
      //     >
      //       Content
      //     </Content>
      //   </Layout>
      // </Layout>
      <div id="quanLy">
        <div id="quanLyMenu">
          <div className="info">
            <p>Admin</p>
            <i
              className="fa-solid fa-arrow-right-from-bracket"
              onClick={handleLogout}
            ></i>
          </div>
          <div>
            <ul>
              <li>
                <NavLink to="/quanly/user">
                  <i className="fa-solid fa-user"></i> User
                </NavLink>
              </li>
              <li>
                <NavLink to="/quanly/film">
                  <i className="fa-solid fa-film"></i> Films
                </NavLink>
              </li>
              <li>
                <NavLink to="/quanly/showtime">
                  <i className="fa-solid fa-bomb"></i> Showtimes
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div id="quanLyContent">
          <Outlet />
        </div>
      </div>
    );
  } else {
    // Return null if the user is not 'QuanTri', you can also show a message or a different component.
    return null;
  }
};

export default QuanLy;
