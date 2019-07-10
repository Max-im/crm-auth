import React from "react";
import MainMenu from "../MainMenu";
import Auth from "../Auth";

export default function index() {
  return (
    <header className="header">
      {/* menu */}
      <MainMenu />

      {/* auth */}
      <Auth />
    </header>
  );
}
