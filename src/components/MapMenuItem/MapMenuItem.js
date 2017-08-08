import React from 'react'
import { Badge } from 'reactstrap'
import { isNull } from 'lodash'
import './MapMenuItem.css'

const MapMenuItem = ({ icon, label, count, selected, onClick }) => (
  <div onClick={onClick}
    className={ selected ? 'CollectionFilters__filter_wrapper d-flex w-100 justify-content-between opacity-100' : 'CollectionFilters__filter_wrapper d-flex w-100 justify-content-between opacity-50'  }>
    <p className="MapFilters__filter">
      <span className={`${icon.class || ''} MapMenuItem__icon`}>{icon.content}</span>
      <span>{label}</span>
    </p>
    <Badge className="CollectionFilters__filter_badge">
      {isNull(count) ? '0' : count}
    </Badge>
  </div>
)

export default MapMenuItem
