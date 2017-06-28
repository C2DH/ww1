import React, { PureComponent } from 'react'
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
      onUncertainYearsChange,
    } = this.props
    return (
      <div className="CollectionFilters__container">
        <div className="CollectionFilters__input_container">
          <i className="fa fa-search CollectionFilters__input_container_icon" />
          <input className="CollectionFilters__input" onChange={onSearchChange} value={searchString} placeholder="Search here (e.g: postcard)" />
        </div>
        {dataTypes &&
          <div className="CollectionFilters__reset_container">
            <h5 className="CollectionFilters__reset_title">TYPE</h5>
            <a className="CollectionFilters__reset">Reset</a>
          </div>
        }
        <div className="CollectionFilters__filter_container">
          {dataTypes && dataTypes.map(({ count, data__type }) => {
            const selected = typeof selectedDataTypes[data__type] !== 'undefined' || Object.keys(selectedDataTypes).length === 0
            return (
              <div key={data__type} onClick={() => onToggleDataType(data__type)}
                style={{ opacity: selected ? '1' : '0.5'  }}>
                <div className="d-inline-flex w-100">
                  <p className="CollectionFilters__filter">{data__type}</p>
                  <Badge  className="CollectionFilters__filter_badge">{count}</Badge>
                </div>
              </div>
            )
          })}
        </div>
        {/* <div className="CollectionFilters__reset_container">
          <h5 className="CollectionFilters__reset_title">PERIOD</h5>
          <a className="CollectionFilters__reset">Reset</a>
        </div> */}

        <div style={{ padding: '10px' }}>
          <YearsRange
            uncertainYears={uncertainYears}
            onUncertainYearsChange={onUncertainYearsChange}
            min={1914}
            max={1920}
            defaultValue={[1914, 1920]}
            onChange={onYearChange}
            value={selectedYears}
            counts={{
              1914: 20,
              1915: 10,
              1917: 5,
              1918: 29,
              1919: 20,
              1920: 5
            }}
            filteredCounts={{
              1914: 10,
              1915: 2,
              1917: 5,
              1919: 10,
              1920: 3
            }}
          />
        </div>
      </div>
    )
  }
}


export default CollectionFilters
