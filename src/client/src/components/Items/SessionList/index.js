import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSessions } from "../../../store/actions/analyst";
import "./style.scss";

export class index extends Component {
  componentDidMount() {
    this.onGetSessions();
  }

  onGetSessions() {
    const { id } = this.props.match.params;
    this.props.getSessions(id);
  }

  static propTypes = {
    getSessions: PropTypes.func.isRequired
  };

  render() {
    const { sessions } = this.props.analyst;
    return (
      <div>
        {sessions && (
          <ul>
            {sessions.map(item => (
              <li key={item._id} className="session__item" key={item._id}>
                <div className="session__body">
                  <img src={item.user.avatar} alt={item.user.personal.name} />
                  <div>
                    <p>{item.user.personal.name}</p>
                    <p>
                      <span>Started</span> - {item.started}
                    </p>
                    {item.finished && (
                      <p>
                        <span>Finished</span> - {item.finished}
                      </p>
                    )}
                    {item.current && <p>Current</p>}
                  </div>
                </div>
                {item.requests.length > 0 && (
                  <ul className="request">
                    {item.requests.map(request => (
                      <li key={request._id} className="request__item">
                        <p className="request__date">{request.time}</p>
                        <p className="request__method">{request.method}</p>
                        <p className="request__url">{request.url}</p>
                        <p className="request__long">{request.long}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
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
  { getSessions }
)(withRouter(index));
