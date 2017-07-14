import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import OpenSideMenu from '../OpenSideMenu'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './SideMenu.css'

import {
  getCurrentLanguage,
} from '../../../state/selectors'


class SideMenu extends PureComponent {
  state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const { language } = this.props
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
       <span className="SideMenu__langBtn btn btn-secondary hidden-md-down">{language.label}</span>
     </div>
     {this.state.open ? <OpenSideMenu closeMenu={this.toggleMenu} key="opensidemenu"/> : null}
    </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = state => ({
  language: getCurrentLanguage(state),
})
export default connect(mapStateToProps)(SideMenu)
