import s from './NavBar.module.css';
import {NavLink} from "react-router-dom";

export const NavBar = () => {
  return (
    <nav className={s.navBar}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink className={({isActive}) => isActive ? s.active : ''} to="/profile">Profile</NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={({isActive}) => isActive ? s.active : ''} to="/dialogs">Messages</NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={({isActive}) => isActive ? s.active : ''} to="/users">Users</NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={({isActive}) => isActive ? s.active : ''} to="/news">News</NavLink>
        </li>
        <li className={s.item}>
          <NavLink className={({isActive}) => isActive ? s.active : ''} to="/music">Music</NavLink>
        </li>
      </ul>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink className={({isActive}) => isActive ? s.active : ''} to="/settings">Settings</NavLink>
        </li>
      </ul>
    </nav>
  )
};
