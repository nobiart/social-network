import React from "react";
import {connect} from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  setStatus,
  setUserProfile,
  updateStatusThunkCreator
} from "../../redux/profileReducer.ts";
import {Profile} from "./Profile.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/WithAuthRedirect.tsx";
import {compose} from "redux";

class ProfileClass extends React.Component<any, any> {
  componentDidMount() {
    const userId = this.props.router.params.userId ?? 31654;
    console.log('userId', userId);
    // this.props.getProfileThunkCreator(userId);
    // this.props.getStatusThunkCreator(userId);
    // this.props.updateStatusThunkCreator(this.props.status);
    this.props.setStatus("");
    this.props.setUserProfile({
      userId: 31654,
      lookingForAJob: false,
      lookingForAJobDescription: 'test',
      fullName: 'Dmitri B.',
      contacts: {
        github: 'https://github.com/nobiart',
      },
      photos: {
        small: null,
        large: null,
      }
    })
  }

  render() {
    return (
      <Profile
        {...this.props}
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

export const ProfileContainer = compose(
  connect(mapStateToProps, {
    setUserProfile,
    setStatus,
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
  }),
  withRouter,
  withAuthRedirect,
)(ProfileClass);
