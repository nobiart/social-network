import {useSelector} from "react-redux";
import {Users} from "./Users.tsx";
import {Preloader} from "../common/preloader/Preloader.tsx";
import {getIsFetching} from "../../redux/usersSelectors.ts";

type UsersPagePropsType = {
  pageTitle: string;
}

export const UsersPage = (props: UsersPagePropsType) => {
  const isFetching = useSelector(getIsFetching);

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader/> : null}
      <Users/>
    </>
  )
};
