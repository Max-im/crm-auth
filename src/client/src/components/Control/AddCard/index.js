import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGroups, createData } from "../../../store/actions/admin";

export class index extends Component {
  state = {
    index: "",
    name: "",
    text: "",
    avatar: "",
    created: "",
    name: "",
    group: ""
  };

  componentDidMount() {
    this.props.getGroups();
  }

  static propTypes = {
    getGroups: PropTypes.func.isRequired,
    createData: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };

  onSubmit(e) {
    e.preventDefault();
    this.props.createData(this.state);
    this.setState({
      index: "",
      name: "",
      text: "",
      avatar: "",
      created: "",
      name: "",
      group: ""
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { groups } = this.props.data;
    return (
      <div>
        <h4>Create User Data</h4>
        {groups && (
          <form onSubmit={this.onSubmit.bind(this)}>
            {Object.keys(this.state)
              .filter(key => key !== "group")
              .map(key => (
                <input
                  type="text"
                  key={key}
                  name={key}
                  placeholder={key}
                  value={this.state[key]}
                  onChange={this.onChange.bind(this)}
                />
              ))}

            <select
              name="group"
              onChange={this.onChange.bind(this)}
              value={this.state.group}
            >
              {groups.map(item => (
                <option key={item._id} value={item._id}>
                  {item.title}
                </option>
              ))}
            </select>

            <button type="submit">Create</button>
          </form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ data: state.data });

export default connect(
  mapStateToProps,
  { getGroups, createData }
)(index);
