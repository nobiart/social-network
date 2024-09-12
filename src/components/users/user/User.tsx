import s from './User.module.css';
import defaultPic from '../../../assets/username.png';
import {NavLink} from "react-router-dom";
import axios from "axios";

export const User = ({user, follow, unfollow}: { user: any, follow: any, unfollow: any }) => {
  const handleFollow = (userId: number | string) => {
    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
      withCredentials: true,
      headers: {
        "API-KEY": "3370cfb8-72a3-4899-97f2-265767d19567",
      }
    })
      .then((res) => {
        if (res.data.resultCode === 0) {
          follow(userId)
        }
      });
  }

  const handleUnfollow = (userId: number | string) => {
    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
      withCredentials: true,
      headers: {
        "API-KEY": "3370cfb8-72a3-4899-97f2-265767d19567",
      }
    })
      .then((res) => {
        if (res.data.resultCode === 0) {
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
