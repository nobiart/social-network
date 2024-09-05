import {User} from "./user/User.tsx";
// import axios from "axios";

export const Users = (props) => {
  const getUsers = () => {
    if (props.users.length === 0) {
      // axios.get('https://social-network.samuraijs.com/api/1.0/users').then((res) => {
      //   props.setUsers(res.data.items);
      // });

      props.setUsers([
        {
          id: 1,
          followed: false,
          photoUrl: 'https://i.pinimg.com/474x/c9/ce/76/c9ce76ccbaeee7c705fac54b52e6463a.jpg',
          fullName: 'John',
          status: 'I`m a dev',
          location: {
            country: 'Moldova',
            city: 'Tiraspol'
          }
        },
        {
          id: 2,
          followed: true,
          photoUrl: 'https://i.pinimg.com/originals/ec/98/4e/ec984e78e2e42293b165bcf3a19b29ef.jpg',
          fullName: 'Jack',
          status: 'Hi!',
          location: {
            country: 'Russia',
            city: 'Moscow'
          }
        },
        {
          id: 3,
          followed: false,
          photoUrl: 'https://i.pinimg.com/474x/c9/ce/76/c9ce76ccbaeee7c705fac54b52e6463a.jpg',
          fullName: 'Anna',
          status: 'I like oranges',
          location: {
            country: 'Ukraine',
            city: 'Kiyv'
          }
        },
        {
          id: 4,
          followed: true,
          photoUrl: 'https://i.pinimg.com/originals/ec/98/4e/ec984e78e2e42293b165bcf3a19b29ef.jpg',
          fullName: 'Sarah',
          status: 'Just married',
          location: {
            country: 'Belarus',
            city: 'Minsk'
          }
        },
      ]);
    }
  };

  return (
    <>
      <button onClick={getUsers}>Get users</button>
      {props.users.map((user) => (
        <User
          key={user.id}
          user={user}
          follow={props.follow}
          unfollow={props.unfollow}
        />
      ))}
    </>
  )
};
