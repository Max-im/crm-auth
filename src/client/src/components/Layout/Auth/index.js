import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { onLogin, onLogOut, onLogError } from "../../../store/actions/auth";

export class index extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    onLogError: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired
  };

  render() {
    const { isAuth, user } = this.props.auth;

    return (
      <div>
        {/* show user data */}
        {isAuth && (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <img src={user.avatar} alt={user.name} />
            <i className="fas fa-sign-out-alt" onClick={this.props.onLogOut} />
          </div>
        )}

        {/* show auth btn */}
        {!isAuth && (
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            buttonText=""
            scope="email profile openid"
            onSuccess={this.props.onLogin}
            onFailure={this.props.onLogError}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { onLogin, onLogOut, onLogError }
)(index);
