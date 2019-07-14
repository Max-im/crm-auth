import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SessionPagination from "../../Items/SessionsPag";
import SessionsList from "../../Items/SessionList";
import Stat from "../../Items/Stat";

export class index extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="page">
        <div className="container">
          <h1>Analyst page</h1>
          <Stat />
          <SessionPagination />
          <SessionsList />
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
