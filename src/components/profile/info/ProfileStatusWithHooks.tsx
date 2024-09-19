import {useEffect, useState} from "react";

export const ProfileStatusWithHooks = (props: any) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  }

  const onChangeStatus = (e: any) => {
    setStatus(e.target?.value);
  }

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            onChange={onChangeStatus}
            onBlur={deactivateEditMode}
            value={status}
            autoFocus={true}
          />
        </div>
      ) : (
        <div>
            <span onDoubleClick={activateEditMode} data-testid="status">
              {status.length > 0 ? status : "No Status"}
            </span>
        </div>
      )}
    </div>
  )
};
