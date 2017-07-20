import React from 'react'
import MapMenuItem from '../MapMenuItem'
import YearsRange  from '../YearsRange'
import './MapSideMenu.css'
import {
  getPlaceTypeIcon,
} from '../../utils'

const MapSideMenu = ({
  dataPlaceTypes,
  selectedPlaceTypes,
  onTogglePlaceTypeSelection,
  onResetSelectedPlaceTypes,
  uncertainYearsCount,
  includeUncertainYears,
  onIncludeUncertainYearsChange,
  yearsCounts,
  yearsFilteredCounts,
  selectedYears,
  onYearsSelectionChange,
  onResetSelectedYears,
}) => (
  <div className="MapSideMenu__container">
    <div className="MapSideMenu__titleContainer">
      <h5 className="MapSideMenu__titleContainer_title">TYPE</h5>
      <a className="MapSideMenu__titleContainer_reset" onClick={onResetSelectedPlaceTypes}>Reset</a>
    </div>
    <div className="MapSideMenu__sitesList">
      {dataPlaceTypes && dataPlaceTypes.map(data => {
        const placeType = data.data__place_type
        // Is current place type selected as a filter?
        const selected = typeof selectedPlaceTypes[placeType] !== 'undefined' ||
                         Object.keys(selectedPlaceTypes).length === 0
        return (
          <MapMenuItem
            selected={selected}
            key={placeType}
            label={placeType}
            count={data.count}
            onClick={() => onTogglePlaceTypeSelection(placeType)}
            iconClass={getPlaceTypeIcon(placeType)}
          />
        )
      })}
      {/* <MapMenuItem label="Shelter" iconClass="fa-home"/>
      <MapMenuItem label="Industrial building" iconClass="fa-industry"/>
      <MapMenuItem label="Cemetery" iconClass="fa-bomb"/>
      <MapMenuItem label="Hospital" iconClass="fa-hospital-o"/>
      <MapMenuItem label="Monument" iconClass="fa-university"/>
      <MapMenuItem label="Railway station" iconClass="fa-train"/>
      <MapMenuItem label="Administrative building" iconClass="fa-building"/>
      <MapMenuItem label="Army camp" iconClass="fa-bomb"/>
      <MapMenuItem label="Others" iconClass="fa-map-marker"/> */}
    </div>
    <div className="MapSideMenu__titleContainer">
      <h5 className="MapSideMenu__titleContainer_title">PERIOD</h5>
      <a className="MapSideMenu__titleContainer_reset" onClick={onResetSelectedYears}>Reset</a>
    </div>
    <div className="MapSideMenu__chartsContainer">
      <YearsRange
        uncertainYearsCount={uncertainYearsCount}
        uncertainYears={includeUncertainYears}
        onUncertainYearsChange={onIncludeUncertainYearsChange}
        min={1914}
        max={1924}
        defaultValue={[1914, 1924]}
        onChange={onYearsSelectionChange}
        value={selectedYears}
        counts={yearsCounts}
        filteredCounts={yearsFilteredCounts}
      />
    </div>
  </div>
)

export default MapSideMenu
