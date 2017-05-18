import React from 'react'
import './Layout.css'

const SideMenu = () => (
  <div className="Layout__SideMenu">

  </div>
)

const Layout = ({ children }) => (
  <div className="Layout">
    <SideMenu />
    <div className="Layout__Container">
      {children}
    </div>
  </div>
)

export default Layout
