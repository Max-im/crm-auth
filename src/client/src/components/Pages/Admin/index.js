import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getData, addMockData, onSetSort } from "../../../store/actions/admin";
import "./style.scss";
import CardControl from "../../Control/CardControl";
import AddCard from "../../Control/AddCard";
import Pagination from "../../Items/Pagination";

export class index extends Component {
  componentDidMount() {
    this.onGetData();
  }

  componentDidUpdate(prev) {
    const { id: prevId } = prev.match.params || 1;
    const { id: currentId } = this.props.match.params || 1;
    const { search: prevSearch } = prev.location;
    const { search: currentSearch } = this.props.location;
    if (prevId !== currentId) this.onGetData();
    if (prevSearch !== currentSearch) this.onGetData();
  }

  onGetData() {
    const { search } = this.props.location;
    const { id } = this.props.match.params;
    this.props.getData(id, search);
  }

  setSort(value) {
    this.props.onSetSort(value);
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    addMockData: PropTypes.func.isRequired,
    onSetSort: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { usersData } = this.props.data;
    const { role } = this.props.auth.user;
    const { id } = this.props.match.params;
    const isAdmin = role === "admin";
    return (
      <div className="page">
        <div className="container">
          <h1>Admin</h1>

          {isAdmin && (
            <button onClick={this.props.addMockData}>Add Mock Data</button>
          )}

          <div className="sort">
            <h3>Sort by</h3>
            <Link
              className="sort__link"
              onClick={this.setSort.bind(this, "date")}
              to={"/admin/" + id + "?sort=date"}
            >
              Date
            </Link>
            <Link
              className="sort__link"
              onClick={this.setSort.bind(this, "index")}
              to={"/admin/" + id + "?sort=index"}
            >
              Index
            </Link>
            <Link
              className="sort__link"
              onClick={this.setSort.bind(this, "name")}
              to={"/admin/" + id + "?sort=name"}
            >
              Name
            </Link>
          </div>

          {isAdmin && <AddCard />}

          {usersData && (
            <>
              <Pagination />
              <ul>
                {usersData.map(item => (
                  <li className="card" key={item._id}>
                    <img src={item.avatar} alt={item.personal.name} />
                    <div>
                      <p>{item.index}</p>
                      <p>{item.text}</p>
                      <p>{item.created}</p>
                      <h4>{item.personal.name}</h4>
                      <p>{item.group.title}</p>

                      {isAdmin && <CardControl id={item._id} />}
                    </div>
                  </li>
                ))}
              </ul>

              <Pagination />
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getData, addMockData, onSetSort }
)(withRouter(index));
