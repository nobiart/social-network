import React from "react";
import {connect} from "react-redux";
import {getProfileThunkCreator, setUserProfile} from "../../redux/profileReducer.ts";
import {Profile} from "./Profile.tsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";

// import axios from "axios";

class ProfileClass extends React.Component<any, any> {
  componentDidMount() {
    const userId = this.props.router.params.userId ?? 1;
    console.log('userId', userId);
    // this.props.getProfileThunkCreator(userId);
    this.props.setUserProfile({
      userId: 2,
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
    return <Profile {...this.props} profile={this.props.profile}/>
  }
}

const mapStateToProps = (state: any) => {
  return {
    profile: state.profilePage.profile,
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

export const ProfileContainer = connect(mapStateToProps, {
  setUserProfile, getProfileThunkCreator
})(withRouter(ProfileClass));
