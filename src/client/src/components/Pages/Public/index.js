import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addMockData } from "../../../store/actions/fake";

export class index extends Component {
  static propTypes = {
    addMockData: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="page">
        <div className="container">
          <h1>Public page</h1>
          <button onClick={this.props.addMockData}>Add fake data</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  { addMockData }
)(index);
