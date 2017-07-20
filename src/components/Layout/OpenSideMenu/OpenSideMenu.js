import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Button, ButtonGroup } from 'reactstrap'
import './OpenSideMenu.css'
import { NavLink, withRouter } from 'react-router-dom'

import {
  getLanguages,
  getCurrentLanguage,
} from '../../../state/selectors'
import {
  setLanguage,
} from '../../../state/actions'

class OpenSideMenu extends PureComponent {
  state = {
    open: false,
  }

  toggleMenu = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { setLanguage, languages, currentLanguage } = this.props
    return (
     <div className="OpenSideMenu d-flex flex-column">
      <div className="OpenSideMenu__top">
        <div className="OpenSideMenu__title-md hidden-lg-up">
          <p>ÉISCHTE WELTKRICH</p>
        </div>
        <ul className="OpenSideMenu__list">
          <li><NavLink exact={true} to="/" onClick={this.props.closeMenu}>Home</NavLink></li>
          <li><NavLink to="/themes" onClick={this.props.closeMenu}>Themes</NavLink></li>
          <li><NavLink exact={true} to="/collection" onClick={this.props.closeMenu}>Collection</NavLink></li>
          <li><NavLink exact={true} to="/map" onClick={this.props.closeMenu}>Map</NavLink></li>
          <li><NavLink exact={true} to="/timeline" onClick={this.props.closeMenu}>Timeline</NavLink></li>
          <li><NavLink exact={true} to="/education" onClick={this.props.closeMenu}>Education</NavLink></li>
        </ul>
      </div>
      <div className="OpenSideMenu__bottom">
       <ul className="OpenSideMenu__bottom_list">
         <li><NavLink to="/" onClick={this.props.closeMenu}>About</NavLink></li>
         <li><NavLink to="/" onClick={this.props.closeMenu}>Terms of use</NavLink></li>
       </ul>
       <div className="OpenSideMenu__bottom_logos">
       </div>
       <div className="OpenSideMenu__lang_control">
          {languages.map((language, i) => (
            <button
              key={language.code}
              onClick={() => setLanguage(language.code)}
              className={`OpenSideMenu__lang_control_btn btn btn-secondary ${language.code === currentLanguage.code ? 'leActiveClassForLang' : ''}`}
            >{language.label}</button>
          ))}
       </div>
      </div>
     </div>
    )
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
  currentLanguage: getCurrentLanguage(state),
})

export default withRouter(connect(mapStateToProps, {
  setLanguage,
})(OpenSideMenu))
