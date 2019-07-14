import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSessionsNum } from "../../../store/actions/analyst";
import Pagination from "../Pagination";

export class index extends Component {
  componentDidMount() {
    this.props.getSessionsNum();
  }

  static propTypes = {
    getSessionsNum: PropTypes.func.isRequired
  };

  render() {
    const { sessionsNumber } = this.props.analyst;
    return (
      <div>
        <Pagination number={sessionsNumber} baseUrl="/analyst/" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  analyst: state.analyst
});

export default connect(
  mapStateToProps,
  { getSessionsNum }
)(index);
