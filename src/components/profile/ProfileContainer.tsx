import {ComponentType, useEffect} from "react";
import {connect} from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  ProfileType,
  saveProfilePhotoThunkCreator,
  saveProfileThunkCreator,
  updateStatusThunkCreator
} from "../../redux/profileReducer.ts";
import {Profile} from "./Profile.tsx";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore.ts";
import {HistoryRouterProps, NavigateFunction} from "react-router-dom";
import {withRouter} from "../../hoc/withRouter.tsx";

// type MapStatePropsType = {
//   profile: ProfileType | null;
//   status: string;
//   userId: number | null;
// }

type MapPropsType = ReturnType<typeof mapStateToProps>;

type MapDispatchPropsType = {
  getProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (text: string) => void;
  savePhoto: (photo?: File) => void;
  saveProfile: (profile: ProfileType, setStatus: (status?: { error: string }) => void) => void;
}

type withRouterPropsType = {
  router: {
    location: Location;
    navigate: NavigateFunction;
    params: Record<"userId", string | undefined>;
  };
  history: HistoryRouterProps["history"];
}

type ProfileClassPropsType = MapPropsType & MapDispatchPropsType & withRouterPropsType;

// export const ProfilePage = () => {
//   return (
//     <Profile
//       isOwner={!props.router.params.userId}
//       profile={props.profile}
//       status={props.status}
//       updateStatus={props.updateStatus}
//       savePhoto={props.savePhoto}
//       saveProfile={props.saveProfile}
//     />
//   )
// }

const ProfileWrapper = (props: ProfileClassPropsType) => {
  const refreshProfile = (userId: number | null, routedUserId?: string) => {
    const combinedUserId: number | null = Number(routedUserId ?? userId);
    if (!combinedUserId) {
      props.history.push("/login");
    }
    props.getProfile(combinedUserId);
    props.getStatus(combinedUserId);
  }

  useEffect(() => {
    refreshProfile(props.userId, props.router.params.userId);
  }, [props.router.params.userId, props.userId]);

  return (
    <Profile
      isOwner={!props.router.params.userId}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
    />
  )
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
  }
};

export const ProfileContainer = compose<ComponentType<{}>>(
  connect<MapPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
    getProfile: getProfileThunkCreator,
    getStatus: getStatusThunkCreator,
    updateStatus: updateStatusThunkCreator,
    savePhoto: saveProfilePhotoThunkCreator,
    saveProfile: saveProfileThunkCreator,
  }),
  withRouter,
  // withAuthRedirect,
)(ProfileWrapper);
