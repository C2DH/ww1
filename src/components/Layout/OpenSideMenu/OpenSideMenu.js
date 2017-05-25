import React, { PureComponent } from 'react'
import './OpenSideMenu.css'


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
         <li>Home</li>
         <li>Themes</li>
         <li>Collection</li>
         <li>Map</li>
         <li>Timeline</li>
         <li>Education</li>
       </ul>
     </div>
    )
  }
}

export default OpenSideMenu
