import React from 'react'
import { Badge } from 'reactstrap'
import './MapMenuItem.css'

const MapMenuItem = ({ icon, label, count, selected, onClick }) => (
  <div className="MapMenuItem__container" onClick={onClick}>
    <i className={`${icon.class || ''} MapMenuItem__icon`}>{icon.content}</i>
    <p style={ selected ? { color: 'black' } :  { color: 'gray' } }>{label}</p>
    <h5 className="MapMenuItem__badge_container">
      <Badge className="MapMenuItem__badge">{count}</Badge>
    </h5>
  </div>
)

export default MapMenuItem
