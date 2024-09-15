import logo from "../../assets/logo.png";
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

export const Header = (props: any) => {
  return (
    <header className={s.header}>
      <img src={logo} alt=""/>
      <div className={s.login}>
        {props.isAuth ? (
          <div>
            {props.login}
            <button onClick={props.logout}>Logout</button>
          </div>
        ) : <NavLink to='/login'>Login</NavLink>}
      </div>
    </header>
  )
};
