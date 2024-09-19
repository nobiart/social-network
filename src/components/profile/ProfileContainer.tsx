import React from "react";
import {connect} from "react-redux";
import {getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator} from "../../redux/profileReducer.ts";
import {Profile} from "./Profile.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.tsx";
import {compose} from "redux";

class ProfileClass extends React.Component<any, any> {
  componentDidMount() {
    const userId = this.props.router.params.userId ?? this.props.userId;
    this.props.getProfileThunkCreator(userId);
    this.props.getStatusThunkCreator(userId);
    this.props.updateStatusThunkCreator(this.props.status);
  }

  render() {
    return (
      <Profile
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatusThunkCreator}
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
    updateStatusThunkCreator,
  }),
  withRouter,
  withAuthRedirect,
)(ProfileClass);
