import React from "react";
import MainMenu from './MainMenu';

function Header() {
  return (
    <div className="header">
      <h1>SoftGPL</h1>
      <MainMenu />
      <input type="search" placeholder="Search" />
    </div>
  )
}

export default Header
