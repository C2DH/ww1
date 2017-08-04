import React from 'react'
import Autocomplete from 'react-autocomplete'
import { pure } from 'recompose'
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
  searchString,
  onSearchChange,
  autocompleteResults,
  onAutocompleteSelect,
}) => (
  <div className="MapSideMenu__container">
    <div className="d-flex align-items-center CollectionFilters__input_container">
      <i className="material-icons CollectionFilters__input_container_icon hidden-md-down">search</i>
      {/* <input className="form-control CollectionFilters__input" onChange={onSearchChange} value={searchString} placeholder="Search here (e.g: postcard)" /> */}
      <form onSubmit={(e) => {
        e.preventDefault()
        onAutocompleteSelect(searchString)
      }}>
      <Autocomplete
        value={searchString}
        onChange={(event, value) => onSearchChange(value)}
        onSelect={onAutocompleteSelect}
        items={autocompleteResults}
        getItemValue={item => item}
        renderItem={(item, isHighlighted) => (
          <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
            {item}
          </div>
        )}
      />
      </form>
    </div>
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
            icon={getPlaceTypeIcon(placeType)}
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
        max={1920}
        onChange={onYearsSelectionChange}
        value={selectedYears}
        counts={yearsCounts}
        filteredCounts={yearsFilteredCounts}
      />
    </div>
  </div>
)

export default pure(MapSideMenu)
