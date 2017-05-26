import React from 'react'
import './MapSideMenu.css'

const MapSideMenu = () => (
  <div>
    <div className="MapSideMenu__titleContainer">
      <h5>TYPE</h5>
      <p>Reset</p>
    </div>
    <ul className="MapSideMenu__sitesList">
      <li>Bombed Site</li>
      <li>Shelter</li>
      <li>Industrial building</li>
      <li>Cemetery</li>
      <li>Hospital</li>
      <li>Monument</li>
      <li>Railway station</li>
      <li>Administrative building</li>
      <li>Army camp</li>
      <li>Others</li>
    </ul>
    <div className="MapSideMenu__titleContainer">
      <h5>PERIOD</h5>
      <p>Reset</p>
    </div>
    <div className="MapSideMenu__chartsContainer">
      chart
    </div>
  </div>
)

export default MapSideMenu
