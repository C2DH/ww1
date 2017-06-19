import React from 'react'
import MapMenuItem from '../MapMenuItem'
import './MapSideMenu.css'

const MapSideMenu = () => (
  <div className="MapSideMenu__container">
    <div className="MapSideMenu__titleContainer">
      <h5 className="MapSideMenu__titleContainer_title">TYPE</h5>
      <a className="MapSideMenu__titleContainer_reset">Reset</a>
    </div>
    <div className="MapSideMenu__sitesList">
      <MapMenuItem label="Bombed Site" iconClass="fa-bomb"/>
      <MapMenuItem label="Shelter" iconClass="fa-home"/>
      <MapMenuItem label="Industrial building" iconClass="fa-industry"/>
      <MapMenuItem label="Cemetery" iconClass="fa-bomb"/>
      <MapMenuItem label="Hospital" iconClass="fa-hospital-o"/>
      <MapMenuItem label="Monument" iconClass="fa-university"/>
      <MapMenuItem label="Railway station" iconClass="fa-train"/>
      <MapMenuItem label="Administrative building" iconClass="fa-building"/>
      <MapMenuItem label="Army camp" iconClass="fa-bomb"/>
      <MapMenuItem label="Others" iconClass="fa-map-marker"/>
    </div>
    <div className="MapSideMenu__titleContainer">
      <h5 className="MapSideMenu__titleContainer_title">PERIOD</h5>
      <a className="MapSideMenu__titleContainer_reset">Reset</a>
    </div>
    <div className="MapSideMenu__chartsContainer">
      chart
    </div>
  </div>
)

export default MapSideMenu
