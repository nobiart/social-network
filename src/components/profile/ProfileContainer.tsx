import React from "react";
import {connect} from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  saveProfilePhotoThunkCreator,
  saveProfileThunkCreator,
  updateStatusThunkCreator
} from "../../redux/profileReducer.ts";
import {Profile} from "./Profile.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.tsx";
import {compose} from "redux";

class ProfileClass extends React.Component<any, any> {
  refreshProfile() {
    const userId = this.props.router.params.userId ?? this.props.userId;
    if (!userId) {
      this.props.history.push("/login");
    }
    this.props.getProfileThunkCreator(userId);
    this.props.getStatusThunkCreator(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.userId !== this.props.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        isOwner={!this.props.router.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    )
  }
}

const mapStateToProps = (state: any) => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.id,
  }
}

function withRouter(ProfileClass: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <ProfileClass
        {...props}
        router={{location, navigate, params}}
      />
    );
  }

  return ComponentWithRouterProp;
}

export const ProfileContainer = compose<any>(
  connect(mapStateToProps, {
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatus: updateStatusThunkCreator,
    savePhoto: saveProfilePhotoThunkCreator,
    saveProfile: saveProfileThunkCreator,
  }),
  withRouter,
  withAuthRedirect,
)(ProfileClass);
