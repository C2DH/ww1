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
     <div className="OpenSideMenu">
       <ul className="OpenSideMenu__list">
         <li><Link to="/" onClick={this.props.closeMenu}>Home</Link></li>
         <li><Link to="/themes" onClick={this.props.closeMenu}>Themes</Link></li>
         <li><Link to="/collection" onClick={this.props.closeMenu}>Collection</Link></li>
         <li><Link to="/map" onClick={this.props.closeMenu}>Map</Link></li>
         <li><Link to="/timeline" onClick={this.props.closeMenu}>Timeline</Link></li>
         <li><Link to="/education" onClick={this.props.closeMenu}>Education</Link></li>
       </ul>
     </div>
    )
  }
}

export default OpenSideMenu
