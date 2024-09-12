import s from './User.module.css';
import defaultPic from '../../../assets/username.png';
import {NavLink} from "react-router-dom";
import {followHandler, unfollowHandler} from "../../../api/api.ts";

export const User = ({user, follow, unfollow}: { user: any, follow: any, unfollow: any }) => {
  const handleFollow = (userId: number) => {
    followHandler(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          follow(userId)
        }
      });
  }

  const handleUnfollow = (userId: number) => {
    unfollowHandler(userId)
      .then((data) => {
        if (data.resultCode === 0) {
          unfollow(userId)
        }
      });
  }

  return (
    <div className={s.wrapper}>
      <div className={s.shortInfo}>
        <NavLink to={`/profile/${user.id}`}>
          <img className={s.profileImg} src={user.photos?.small ?? defaultPic} alt={user.name ?? user.fullName}/>
        </NavLink>
        {user.followed
          ? <button className={s.submit} onClick={() => handleUnfollow(user.id)}>Unfollow</button>
          : <button className={s.submit} onClick={() => handleFollow(user.id)}>Follow</button>}
      </div>
      <div className={s.info}>
        <div className={s.infoRow}>
          <span>{user.name}</span>
          <span>{user.status}</span>
        </div>
        <div className={s.infoRow}>
          <span>{'user.location.country'}</span>
          <span>{'user.location.city'}</span>
        </div>
      </div>
    </div>
  )
};
