import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { cardUpdate, getUser } from "../../../store/actions/admin";
import RoleControl from "../RoleControl";

export class index extends Component {
  state = { index: "", text: "", name: "" };

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getUser(id);
  }

  componentDidUpdate(prev) {
    if (
      (!prev.data.user && this.props.data.user) ||
      (prev.data.user &&
        prev.data.user._id &&
        prev.data.user._id !== this.props.data.user._id)
    ) {
      const { index, text, personal } = this.props.data.user;
      this.setState({ index, text, name: personal.name });
    }
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
    cardUpdate: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired
  };

  render() {
    const { user } = this.props.data;
    return (
      <div>
        <div className="container">
          {user && (
            <>
              <form onSubmit={this.onSubmit.bind(this)}>
                {Object.keys(this.state).map(key => (
                  <input
                    key={key}
                    type="text"
                    placeholder={key}
                    name={key}
                    value={this.state[key]}
                    onChange={this.onChange.bind(this)}
                  />
                ))}

                <button type="submit">Update</button>
              </form>

              <RoleControl />
            </>
          )}
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
  { cardUpdate, getUser }
)(withRouter(index));
