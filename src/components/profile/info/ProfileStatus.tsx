import React from "react";

export class ProfileStatus extends React.Component<any, any> {
  state = {
    editMode: false,
    status: this.props.status,
  };

  onStatusChange = (e: any) => {
    this.setState({
      status: e.currentTarget?.value,
    })
  }

  activateEditMode = () => {
    this.setState({editMode: true});
  }

  deactivateEditMode = () => {
    this.setState({editMode: false});
    this.props.updateStatus(this.state.status);
  }

  render() {
    return (
      <div>
        {this.state.editMode ? (
          <div>
            <input
              type="text"
              onChange={this.onStatusChange}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
              autoFocus={true}
            />
          </div>
        ) : (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status.length > 0 ? this.props.status : "No Status"}
            </span>
          </div>
        )}
      </div>
    )
  }
}
