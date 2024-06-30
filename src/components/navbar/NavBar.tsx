import s from './NavBar.module.css';

export const NavBar = () => {
  return (
    <nav className={s.navBar}>
      <ul className={s.list}>
        <li className={s.item}><a href="#">Profile</a></li>
        <li className={s.item}><a href="#">Messages</a></li>
        <li className={s.item}><a href="#">News</a></li>
        <li className={s.item}><a href="#">Music</a></li>
      </ul>
      <ul className={s.list}>
        <li className={s.item}><a href="#">Settings</a></li>
      </ul>
    </nav>
  )
};
