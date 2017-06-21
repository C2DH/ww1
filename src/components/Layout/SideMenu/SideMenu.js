import React, { PureComponent } from 'react'
import OpenSideMenu from '../OpenSideMenu'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './SideMenu.css'


class SideMenu extends PureComponent {

  state = {
    open:false
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    return (
      <CSSTransitionGroup component="div"
      transitionName="sidemenu"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={300}>
       <div
         key="open"
         className={this.state.open ? `SideMenu` : `SideMenu-close`}
         >
       <button className="SideMenu__menuBtn" onClick={this.toggleMenu} key="button">
         {this.state.open ? <div><i className="icon-close" /><p className="SideMenu__menuBtn-text">close</p></div> : <div><i className="icon-dehaze" /><p className="SideMenu__menuBtn-text">Menu</p></div>}
       </button>
     </div>
     {this.state.open ? <OpenSideMenu key="close" closeMenu={this.toggleMenu} key="opensidemenu"/> : null}
    </CSSTransitionGroup>
    )
  }
}

export default SideMenu
