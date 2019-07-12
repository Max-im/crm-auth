import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { getUserNum } from "../../../store/actions/admin";
import "./style.scss";

export class index extends Component {
  componentDidMount() {
    this.props.getUserNum();
  }

  static propTypes = {
    getUserNum: PropTypes.func.isRequired
  };

  render() {
    const { userNum, sortBy } = this.props.data;
    const pagesNum = Math.ceil(userNum / 100);
    const { id: activePage } = this.props.match.params;

    const allPages = [];
    for (let i = 0; i + 1 < pagesNum; i++) {
      allPages.push(i + 1);
    }
    const min = activePage - 5 > 1 ? activePage - 5 : 2;
    const max =
      activePage - 0 + 5 < pagesNum ? activePage - 0 + 5 : pagesNum - 1;
    const pages = allPages.filter(v => v >= min && v <= max);
    return (
      <div>
        {userNum && (
          <ul className="pagination">
            {/* first page */}
            <li key="1">
              <Link
                to={"/admin/1?sort=" + sortBy}
                className={
                  "pagination__page " +
                  (activePage - 0 === 1 && "pagination__page_active")
                }
              >
                1
              </Link>
            </li>

            {min !== 2 && "..."}

            {/* other pages */}
            {pages.map(page => (
              <li key={page}>
                <Link
                  className={
                    "pagination__page " +
                    (activePage - 0 === page && "pagination__page_active")
                  }
                  to={"/admin/" + page + "?sort=" + sortBy}
                >
                  {page}
                </Link>
              </li>
            ))}

            {max !== pagesNum - 1 && "..."}
            {/* last page */}
            <li key={pagesNum}>
              <Link
                className={
                  "pagination__page " +
                  (activePage - 0 === pagesNum && "pagination__page_active")
                }
                to={"/admin/" + pagesNum + "?sort=" + sortBy}
              >
                {pagesNum}
              </Link>
            </li>
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});

export default connect(
  mapStateToProps,
  { getUserNum }
)(withRouter(index));
