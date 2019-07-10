import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

export class indes extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { role } = this.props.auth.user;

    return (
      <nav>
        <ul className="mainMenu">
          <li className="mainMenu__item">
            <NavLink to="/" className="mainMenu__link">
              public
            </NavLink>
          </li>
          {["admin", "moderator"].includes(role) && (
            <li className="mainMenu__item">
              <NavLink to="/admin" className="mainMenu__link">
                users
              </NavLink>
            </li>
          )}
          {["analyst"].includes(role) && (
            <li className="mainMenu__item">
              <NavLink to="/analist" className="mainMenu__link">
                analyst
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(indes);
