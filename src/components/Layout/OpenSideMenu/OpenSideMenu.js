import React, { PureComponent } from 'react'
import './OpenSideMenu.css'
import { Link } from 'react-router-dom'


class OpenSideMenu extends PureComponent {

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
     <div className="OpenSideMenu d-flex flex-column">
      <div className="OpenSideMenu__top">
        <div className="OpenSideMenu__title-md hidden-lg-up">
          <p>ÉISCHTE WELTKRICH</p>
        </div>
        <ul className="OpenSideMenu__list">
          <li><Link to="/" onClick={this.props.closeMenu}>Home</Link></li>
          <li><Link to="/themes" onClick={this.props.closeMenu}>Themes</Link></li>
          <li><Link to="/collection" onClick={this.props.closeMenu}>Collection</Link></li>
          <li><Link to="/map" onClick={this.props.closeMenu}>Map</Link></li>
          <li><Link to="/timeline" onClick={this.props.closeMenu}>Timeline</Link></li>
          <li><Link to="/education" onClick={this.props.closeMenu}>Education</Link></li>
        </ul>
      </div>
      <div className="OpenSideMenu__bottom">
       <ul className="OpenSideMenu__bottom_list">
         <li><Link to="/" onClick={this.props.closeMenu}>About</Link></li>
         <li><Link to="/" onClick={this.props.closeMenu}>Terms of use</Link></li>
       </ul>
       <div className="OpenSideMenu__lang_control">

       </div>
       <div className="OpenSideMenu__bottom_logos">
       </div>
      </div>
     </div>
    )
  }
}

export default OpenSideMenu
