import s from './User.module.css';
import defaultPic from '../../../assets/username.png';
import {NavLink} from "react-router-dom";

interface IUserProps {
  user: any,
  follow: (id: number) => void,
  unfollow: (id: number) => void,
  isFollowing: number[],
}

export const User = ({user, follow, unfollow, isFollowing}: IUserProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.shortInfo}>
        <NavLink to={`/profile/${user.id}`}>
          <img className={s.profileImg} src={user.photos?.small ?? defaultPic} alt={user.name ?? user.fullName}/>
        </NavLink>
        {user.followed
          ? <button
            className={s.submit}
            onClick={() => unfollow(user.id)}
            disabled={isFollowing.some(id => id === user.id)}
          >
            Unfollow
          </button>
          : <button
            className={s.submit}
            onClick={() => follow(user.id)}
            disabled={isFollowing.some(id => id === user.id)}
          >
            Follow
          </button>
        }
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
