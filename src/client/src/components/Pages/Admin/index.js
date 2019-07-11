import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getData, addMockData, getRoles } from "../../../store/actions/admin";
import "./style.scss";
import CardControl from "../../Control/CardControl";
import AddCard from "../../Control/AddCard";

export class index extends Component {
  state = { skipNum: 0 };

  componentDidMount() {
    const { usersData } = this.props.data;
    if (usersData.length === 0) this.props.getData(this.state.skipNum);
    this.props.getRoles();
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    const fromBottomPx =
      document.documentElement.scrollHeight -
      window.pageYOffset -
      window.innerHeight;

    if (this.props.data.usersData.length > 0 && fromBottomPx < 10) {
      const newSkipNum = this.state.skipNum + 50;
      this.props.getData(newSkipNum);
      this.setState({ skipNum: newSkipNum });
    }
  }

  static propTypes = {
    getData: PropTypes.func.isRequired,
    addMockData: PropTypes.func.isRequired,
    getRoles: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { usersData } = this.props.data;
    const { role } = this.props.auth.user;
    const isAdmin = role === "admin";
    return (
      <div className="page">
        <div className="container">
          <h1>Admin</h1>
          <button onClick={this.props.addMockData}>Add Mock Data</button>

          {isAdmin && <AddCard />}
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
  { getData, addMockData, getRoles }
)(index);
