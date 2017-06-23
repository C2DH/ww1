import React, { PureComponent } from 'react'
import Slider from 'rc-slider'
import { Badge } from 'reactstrap'
import './CollectionFilters.css'

const Range = Slider.Range

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
          {dataTypes && dataTypes.map(({ count, data__type }) => (
            <div key={data__type} onClick={() => onToggleDataType(data__type)}
              style={{ opacity: typeof selectedDataTypes[data__type] !== 'undefined' ? '1' : '0.5'  }}>
              <div className="d-inline-flex w-100">
                <p className="CollectionFilters__filter">{data__type}</p>
                <Badge  className="CollectionFilters__filter_badge">{count}</Badge>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: '10px' }}>
          <Range min={1914} max={1920} defaultValue={[1914, 1920]} onChange={onYearChange} value={selectedYears} />
        </div>
      </div>
    )
  }
}


export default CollectionFilters
