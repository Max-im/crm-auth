import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class index extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="page">
        <div className="container">
          <h1>Analyst page</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  {}
)(index);
