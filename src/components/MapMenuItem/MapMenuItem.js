import React from 'react'
import { Badge } from 'reactstrap'
import './MapMenuItem.css'


const MapMenuItem = (props) => (
  <div className="MapMenuItem__container">
    <i className={`fa ${props.iconClass} MapMenuItem__icon`} />
    <p>{props.label}</p>
    <h5 className="MapMenuItem__badge_container">
      <Badge className="MapMenuItem__badge">1</Badge>
    </h5>
  </div>
)

export default MapMenuItem
