import {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppStateType} from "../../../redux/reduxStore.ts";
import {ProfileActionsType, updateStatusThunkCreator} from "../../../redux/profileReducer.ts";
import {Input} from "antd";

const {TextArea} = Input;

export const ProfileStatus = () => {
  const status = useSelector((state: AppStateType) => state.profilePage.status);

  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  const dispatch: AppDispatch<ProfileActionsType["type"]> = useDispatch();

  const onUpdateStatus = (status: string) => {
    dispatch(updateStatusThunkCreator(status)).then(() => setEditMode(false));
  }

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    if (localStatus) onUpdateStatus(localStatus);
  }

  const onChangeStatus = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalStatus(e.target?.value);
  }

  return (
    <div>
      <div><b>Status:</b></div>
      {editMode ? (
        <div>
          <TextArea
            autoSize
            autoFocus
            onChange={onChangeStatus}
            onBlur={deactivateEditMode}
            value={localStatus ?? undefined}
          />
        </div>
      ) : (
        <div>
            <span onDoubleClick={activateEditMode} data-testid="status">
              {localStatus ?? "No Status"}
            </span>
        </div>
      )}
    </div>
  )
};
