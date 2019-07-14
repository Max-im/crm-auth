import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStat } from "../../../store/actions/analyst";

export class index extends Component {
  componentDidMount() {
    this.props.getStat();
  }
  static propTypes = {
    getStat: PropTypes.func.isRequired
  };

  render() {
    const { stat } = this.props.analyst;
    return (
      <div>
        <h2>Stat</h2>
        {stat && (
          <div>
            {stat.ageAvg && (
              <p>
                <span>Age avarege - </span>
                {stat.ageAvg}
              </p>
            )}
            {stat.indexSum && (
              <p>
                <span>Index sum - </span>
                {stat.indexSum}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  analyst: state.analyst
});

export default connect(
  mapStateToProps,
  { getStat }
)(index);
