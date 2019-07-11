import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { onCardDelete } from "../../../store/actions/admin";

export class index extends Component {
  static propTypes = {
    onCardDelete: PropTypes.func.isRequired
  };

  render() {
    const { id, onCardDelete } = this.props;
    return (
      <div>
        <Link className="fas fa-pen-square" to={"/card-update/" + id} />
        <i className="fas fa-trash-alt" onClick={onCardDelete.bind(this, id)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { onCardDelete }
)(index);
