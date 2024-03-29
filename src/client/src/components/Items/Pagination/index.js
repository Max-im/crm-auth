import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import "./style.scss";

export class index extends Component {
  render() {
    const { number, baseUrl } = this.props;
    const pagesNum = Math.ceil(number / 100);
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
        {number && (
          <ul className="pagination">
            {/* first page */}
            <li key="1">
              <Link
                to={baseUrl + "1"}
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
                  to={baseUrl + page}
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
                to={baseUrl + pagesNum}
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
  {}
)(withRouter(index));
