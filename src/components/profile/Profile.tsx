import {ProfileInfo} from "./info/ProfileInfo.tsx";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  ProfileActionsType,
  ProfileType,
  saveProfilePhotoThunkCreator,
  saveProfileThunkCreator
} from "../../redux/profileReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../redux/reduxStore.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {Posts} from "./posts/Posts.tsx";

export const Profile = () => {
  const profile = useSelector((state: AppStateType) => state.profilePage.profile);
  const userId = useSelector((state: AppStateType) => state.auth.id);

  const navigate = useNavigate();
  const params = useParams();

  const isOwner = !params.userId;

  const dispatch: AppDispatch<ProfileActionsType["type"]> = useDispatch();

  const onSavePhoto = (file?: File) => {
    dispatch(saveProfilePhotoThunkCreator(file)).then();
  }

  const onUpdateProfile = (profile: ProfileType, setStatus: (status?: any) => void) => {
    dispatch(saveProfileThunkCreator(profile, setStatus)).then();
  }

  const refreshProfile = (userId: number | null, routedUserId?: string) => {
    const combinedUserId: number | null = Number(routedUserId ?? userId);

    if (!combinedUserId) navigate("/login");

    dispatch(getProfileThunkCreator(combinedUserId)).then();
    dispatch(getStatusThunkCreator(combinedUserId)).then();
  }

  useEffect(() => {
    refreshProfile(userId, params.userId);
  }, [userId, params.userId]);

  return (
    <div>
      <ProfileInfo
        isOwner={isOwner}
        profile={profile}
        savePhoto={onSavePhoto}
        saveProfile={onUpdateProfile}
      />
      <Posts/>
    </div>
  )
};
