import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/reduxStore.ts";
import {Avatar, Button, Layout, Menu, MenuProps, Space, Tooltip, Typography} from "antd";
import {LogoutOutlined, UserOutlined} from "@ant-design/icons";
import {AuthActionsType, logoutThunkCreator} from "../../redux/authReducer.ts";

const topNav: MenuProps['items'] = [
  {
    key: "1",
    label: <Link to="/profile">Profile</Link>,
  },
  {
    key: "2",
    label: <Link to="/users">Users</Link>
  },
  {
    key: "3",
    label: <Link to="/news">News</Link>
  },
  {
    key: "4",
    label: <Link to="/chat">Chat</Link>
  }
];

export const Header = () => {
  const {Header} = Layout;
  const {isAuth, login} = useSelector((state: AppStateType) => state.auth);

  const dispatch: AppDispatch<AuthActionsType["type"]> = useDispatch();

  const onLogout = () => {
    dispatch(logoutThunkCreator()).then();
  }

  return (
    <Header style={{display: 'flex', alignItems: 'center'}}>
      <div className="demo-logo"/>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        items={topNav}
        style={{flex: 1, minWidth: 0}}
      />
      {isAuth ? (
        <Space direction="horizontal">
          <Avatar size="large" icon={<UserOutlined/>}/>
          <Typography.Text style={{color: "white"}}>{login}</Typography.Text>
          <Tooltip title="Logout">
            <Button onClick={onLogout} type="default" shape="circle" icon={<LogoutOutlined/>}/>
          </Tooltip>
        </Space>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </Header>
  )
};
