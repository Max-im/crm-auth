import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateRole, getRoles } from "../../../store/actions/admin";

export class index extends Component {
  componentDidMount() {
    this.props.getRoles();
  }

  onChange(e) {
    const { _id: userId, role } = this.props.data.user;
    const roleName = e.target.value;
    if (roleName === role) return;
    this.props.updateRole({ userId, roleName });
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    updateRole: PropTypes.func.isRequired,
    getRoles: PropTypes.func.isRequired
  };

  render() {
    const { roles, user } = this.props.data;

    return (
      <div>
        {roles &&
          roles.map(role => (
            <div key={role}>
              <label>
                {role}
                <input
                  type="radio"
                  name={role}
                  value={role}
                  checked={user.role === role}
                  onChange={this.onChange.bind(this)}
                />
              </label>
            </div>
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { updateRole, getRoles }
)(withRouter(index));
