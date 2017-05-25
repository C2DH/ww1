import React from 'react'
import SideMenu from './SideMenu'
import './Layout.css'

const Layout = ({ children }) => (
  <div className="Layout">
    <SideMenu />
    <div className="Layout__Container">
      {children}
    </div>
  </div>
)

export default Layout
