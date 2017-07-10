import React, { PureComponent } from 'react'
import { isNull, memoize } from 'lodash'
import { Badge } from 'reactstrap'
import YearsRange from '../YearsRange'
import './CollectionFilters.css'

class CollectionFilters extends PureComponent {
  render() {
    const {
      onSearchChange,
      searchString,
      dataTypes,
      selectedDataTypes,
      onToggleDataType,
      onYearChange,
      selectedYears,
      uncertainYears,
      yearsCounts,
      yearsFilteredCounts,
      onUncertainYearsChange,
      uncertainYearsCount,
    } = this.props
    return (
      <div className="CollectionFilters__container">
        <div className="d-flex align-items-center CollectionFilters__input_container">
          <i className="material-icons CollectionFilters__input_container_icon">search</i>
          <input className="form-control CollectionFilters__input" onChange={onSearchChange} value={searchString} placeholder="Search here (e.g: postcard)" />
        </div>
        {dataTypes &&
          <div className="CollectionFilters__reset_container d-flex align-items-center">
            <h5 className="CollectionFilters__reset_title">TYPE</h5>
            <a className="CollectionFilters__reset">Reset</a>
          </div>
        }
        <div className="CollectionFilters__filter_container d-flex flex-column">
          {dataTypes && dataTypes.map(({ count, data__type }) => {
            const selected = typeof selectedDataTypes[data__type] !== 'undefined' || Object.keys(selectedDataTypes).length === 0
            return (
                <div key={data__type} onClick={() => onToggleDataType(data__type)}
                     className={ selected ? 'CollectionFilters__filter_wrapper d-flex w-100 justify-content-between opacity-100' : 'CollectionFilters__filter_wrapper d-flex w-100 justify-content-between opacity-50'  }>

                  <p className="CollectionFilters__filter">{data__type}</p>
                  <Badge className="CollectionFilters__filter_badge">
                    {isNull(count) ? '0' : count}
                  </Badge>
                </div>
            )
          })}
        </div>
        <div className="CollectionFilters__reset_container d-flex align-items-center">
          <h5 className="CollectionFilters__reset_title">PERIOD</h5>
          <a className="CollectionFilters__reset">Reset</a>
        </div>

        <div className="CollectionFilters__time">
          <YearsRange
            uncertainYearsCount={uncertainYearsCount}
            uncertainYears={uncertainYears}
            onUncertainYearsChange={onUncertainYearsChange}
            min={1914}
            max={1920}
            defaultValue={[1914, 1920]}
            onChange={onYearChange}
            value={selectedYears}
            counts={yearsCounts}
            filteredCounts={yearsFilteredCounts}
          />
        </div>
      </div>
    )
  }
}


export default CollectionFilters
