import {Link} from "react-router-dom";
import {Layout, Menu, MenuProps, theme} from "antd";

const {Sider} = Layout;

const sidebarNav: MenuProps['items'] = [
  {
    key: "sub1",
    label: "My Profile",
    children: [
      {
        key: "1",
        label: <Link to="/profile">Profile</Link>
      },
      {
        key: "2",
        label: <Link to="/dialogs">Messages</Link>
      },
      {
        key: "3",
        label: <Link to="/settings">Settings</Link>
      },
    ]
  },
  {
    key: "4",
    label: <Link to="/users">Users</Link>
  },
  {
    key: "5",
    label: <Link to="/news">News</Link>
  },
  {
    key: "sub2",
    label: "Media",
    children: [
      {key: "6", label: <Link to="/music">Music</Link>},
      {key: "7", label: <Link to="/video">Video</Link>},
    ]
  }
];

export const NavBar = () => {
  const {token: {colorBgContainer}} = theme.useToken();

  return (
    <Sider style={{background: colorBgContainer}} width={200}>
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{height: '100%'}}
        items={sidebarNav}
      />
    </Sider>
  )
};
