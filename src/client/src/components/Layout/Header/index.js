import React from "react";
import MainMenu from "../MainMenu";
import Auth from "../Auth";
import "./style.scss";

export default function index() {
  return (
    <header className="header">
      <div className="container header__body">
        {/* menu */}
        <MainMenu />

        {/* auth */}
        <Auth />
      </div>
    </header>
  );
}
