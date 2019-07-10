import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class index extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <div className="page">
        <div className="container">
          <h1>Admin</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {}
)(index);
