import React, { PureComponent } from 'react'
import Autocomplete from 'react-autocomplete'
import { isNull, memoize } from 'lodash'
import { Badge } from 'reactstrap'
import YearsRange from '../YearsRange'
import './CollectionFilters.css'

class CollectionFilters extends PureComponent {
  render() {
    const {
      onSearchChange,
      searchString,
      toggleOpen,
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
      onResetDataType,
      onResetYear,
      hideFilters,
      autocompleteResults,
      onAutocompleteSelect,
    } = this.props
    return (
      <div className="CollectionFilters__container">
        <div className="CollectionFilters__filtermobile_title d-flex align-items-center hidden-lg-up">
          <h2>Filters</h2>
          <button type="button" className="CollectionFilters__filtermobile_title__check btn btn-secondary" onClick={toggleOpen}>
            <i className="material-icons">check</i>
          </button>
        </div>
        <div className="d-flex align-items-center CollectionFilters__input_container">
          <i className="material-icons CollectionFilters__input_container_icon hidden-md-down">search</i>
          {/* <input className="form-control CollectionFilters__input" onChange={onSearchChange} value={searchString} placeholder="Search here (e.g: postcard)" /> */}
          <form onSubmit={(e) => {
            e.preventDefault()
            onAutocompleteSelect(searchString)
          }}>
          <Autocomplete
            inputProps={{
              className:'form-control CollectionFilters__input',
              placeholder:'Search here (e.g: postcard)'
            }}
            wrapperStyle={{display:'flex', position:'relative'}}
            value={searchString}
            onChange={(event, value) => onSearchChange(value)}
            onSelect={onAutocompleteSelect}
            items={autocompleteResults}
            getItemValue={item => item}
            renderItem={(item, isHighlighted) => (
              <div className={isHighlighted ? 'CollectionFilters__autocompleteItem active' : 'CollectionFilters__autocompleteItem'}>
                {item}
              </div>
            )}
          />
          </form>
        </div>

        {!hideFilters && <div>
          {dataTypes &&
            <div className="CollectionFilters__reset_container d-flex align-items-center">
              <h5 className="CollectionFilters__reset_title">TYPE</h5>
              <a className="CollectionFilters__reset" onClick={onResetDataType}>Reset</a>
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
            <a className="CollectionFilters__reset" onClick={onResetYear}>Reset</a>
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
        </div>}
      </div>
    )
  }
}


export default CollectionFilters
