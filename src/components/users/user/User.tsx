import s from './User.module.css';

export const User = ({user, follow, unfollow}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.shortInfo}>
        <img className={s.profileImg} src={user.photoUrl} alt={user.fullName}/>
        {user.followed
          ? <button className={s.submit} onClick={() => unfollow(user.id)}>Unfollow</button>
          : <button className={s.submit} onClick={() => follow(user.id)}>Follow</button>}
      </div>
      <div className={s.info}>
        <div className={s.infoRow}>
          <span>{user.fullName}</span>
          <span>{user.status}</span>
        </div>
        <div className={s.infoRow}>
          <span>{user.location.country}</span>
          <span>{user.location.city}</span>
        </div>
      </div>
    </div>
  )
};
