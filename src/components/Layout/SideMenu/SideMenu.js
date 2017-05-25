import React, { PureComponent } from 'react'
import OpenSideMenu from '../OpenSideMenu'
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
     <div className="SideMenu">
       {this.state.open ? <OpenSideMenu /> : null}
       <button className="SideMenu__menuBtn" onClick={this.toggleMenu}>
         {this.state.open ? <div><i className="icon-close" /><p className="SideMenu__menuBtn-text">close</p></div> : <div><i className="icon-dehaze" /><p className="SideMenu__menuBtn-text">Menu</p></div>}
       </button>
     </div>
    )
  }
}

export default SideMenu
