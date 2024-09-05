import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {PostsContainer} from "./posts/PostsContainer.tsx";
import React from "react";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer.ts";

// import axios from "axios";

class Profile extends React.Component<any, any> {
  componentDidMount() {
    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
    //   .then((res) => {
    //     this.props.setUserProfile(res.data);
    //   });
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
    return (
      <div>
        <ProfileInfo {...this.props} profile={this.props.profile}/>
        <PostsContainer/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    profile: state.profilePage.profile,
  }
}

export const ProfileContainer = connect(mapStateToProps, {
  setUserProfile
})(Profile);
