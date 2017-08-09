import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import OpenSideMenu from '../OpenSideMenu'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './SideMenu.css'

import {
  getCurrentLanguage,
} from '../../../state/selectors'

const Burger = ({ open, onClick, className = '' }) => (
  <button type="button" onClick={onClick} key="button" className={`SideMenu__menuBtn btn btn-secondary ${className}`}>
    <i className="material-icons md-36">{open ? "close" : "menu"}</i>
  </button>
)

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
         className={this.state.open ? "SideMenu d-flex flex-column justify-content-center animated fadeInLeft" : "SideMenu-close d-flex flex-column justify-content-center animated fadeInLeft"}
         >
         <Switch>
           <Route path='/collection' render={() => <Burger className="SideMenu__menuBtnDark" open={this.state.open} onClick={this.toggleMenu} />} />
           <Route path='/map' render={() => <Burger className="SideMenu__menuBtnDark" open={this.state.open} onClick={this.toggleMenu} />} />
           <Route path='/timeline' render={() => <Burger className="SideMenu__menuBtnDark" open={this.state.open} onClick={this.toggleMenu} />} />
           <Route path='/resources' render={() => <Burger className="SideMenu__menuBtnDark" open={this.state.open} onClick={this.toggleMenu} />} />
           <Route path='/about' render={() => <Burger className="SideMenu__menuBtnDark" open={this.state.open} onClick={this.toggleMenu} />} />
           <Route render={() => <Burger open={this.state.open} onClick={this.toggleMenu} />} />
         </Switch>

      {/* <button type="button" onClick={this.toggleMenu} key="button" className="SideMenu__menuBtn btn btn-secondary">
        <i className="material-icons md-36">{this.state.open ? "close" : "menu"}</i>
      </button> */}
      <div className="SideMenu__menuBtn-text hidden-md-down">
        <h6>{this.state.open ? "close" : "menu"}</h6>
      </div>
      <div className={this.state.open ? "SideMenu__vertical_title_container d-flex justify-content-center hidden-md-down" : "SideMenu__vertical_title_container_close d-flex justify-content-center hidden-md-down"}>
         <p className="SideMenu__vertical_title">ÉISCHTE WELTKRICH</p>
       </div>
       <span className="SideMenu__langBtn btn btn-secondary hidden-md-down" onClick={this.toggleMenu} >{language.label}</span>
     </div>
     {this.state.open ? <OpenSideMenu closeMenu={this.toggleMenu} key="opensidemenu"/> : null}
    </CSSTransitionGroup>
    )
  }
}

const mapStateToProps = state => ({
  language: getCurrentLanguage(state),
})
export default withRouter(connect(mapStateToProps)(SideMenu))
