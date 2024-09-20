import {useEffect, useState} from "react";

interface IProfileStatusProps {
  status: string,
  updateStatus: (status: string) => void,
}

// @TODO to debug why the status is resetting after component mounts

export const ProfileStatusWithHooks = ({status, updateStatus}: IProfileStatusProps) => {
  const [editMode, setEditMode] = useState(false);
  const [localStatus, setLocalStatus] = useState(status);

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    updateStatus(localStatus);
  }

  const onChangeStatus = (e: any) => {
    setLocalStatus(e.target?.value);
  }

  return (
    <div>
      <div><b>Status:</b></div>
      {editMode ? (
        <div>
          <input
            type="text"
            onChange={onChangeStatus}
            onBlur={deactivateEditMode}
            value={localStatus}
            autoFocus={true}
          />
        </div>
      ) : (
        <div>
            <span onDoubleClick={activateEditMode} data-testid="status">
              {localStatus?.length > 0 ? localStatus : "No Status"}
            </span>
        </div>
      )}
    </div>
  )
};
