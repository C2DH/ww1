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
         className={this.state.open ? "SideMenu d-flex flex-column justify-content-center" : "SideMenu-close d-flex flex-column justify-content-center"}
         >
      <button type="button" onClick={this.toggleMenu} key="button" className="SideMenu__menuBtn btn btn-secondary">
        <i className="material-icons md-36">{this.state.open ? "close" : "menu"}</i>
      </button>
      <div className="SideMenu__menuBtn-text hidden-md-down">
        <h6>{this.state.open ? "close" : "menu"}</h6>
      </div>
      <div className={this.state.open ? "SideMenu__vertical_title_container d-flex justify-content-center hidden-md-down" : "SideMenu__vertical_title_container_close d-flex justify-content-center hidden-md-down"}>
         <p className="SideMenu__vertical_title">ÉISCHTE WELTKRICH</p>
       </div>
       <button type="button" className="SideMenu__langBtn btn btn-secondary hidden-md-down">EN</button>
     </div>
     {this.state.open ? <OpenSideMenu key="close" closeMenu={this.toggleMenu} key="opensidemenu"/> : null}
    </CSSTransitionGroup>
    )
  }
}

export default SideMenu
