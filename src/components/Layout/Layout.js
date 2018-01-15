import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ScrollLock from 'react-scrolllock'
import SideMenu from './SideMenu'
import './Layout.css'

const Layout = ({ children, scrollLock }) => (
  <div className="Layout">
    <SideMenu />
    <div className="Layout__Container">
      {children}
    </div>
    {scrollLock && <ScrollLock />}
  </div>
)

const mapStateToProps = state => ({
  scrollLock: state.scrollLock,
})
export default withRouter(connect(mapStateToProps)(Layout))
