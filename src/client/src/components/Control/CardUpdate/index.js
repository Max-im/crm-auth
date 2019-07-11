import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { cardUpdate } from "../../../store/actions/admin";

export class index extends Component {
  state = { index: "", text: "", name: "" };

  componentDidMount() {
    const { id } = this.props.match.params;
    const theUser = this.props.data.usersData.find(item => item._id === id);
    this.setState({
      index: theUser.index,
      text: theUser.text,
      name: theUser.personal.name
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.cardUpdate({ ...this.state, id }, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  static propTypes = {
    data: PropTypes.object.isRequired,
    cardUpdate: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.onSubmit.bind(this)}>
            {Object.keys(this.state).map(key => (
              <input
                key={key}
                type="text"
                name={key}
                value={this.state[key]}
                onChange={this.onChange.bind(this)}
              />
            ))}

            <button type="submit">Update</button>
          </form>
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
  { cardUpdate }
)(withRouter(index));
