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

    /* remove it and move ordering to api*/
    const hcOrder = {
      'audio':1,
      'book':2,
      'correspondence':3,
      'image':4,
      'physical object':5,
      'video':6,
      'other':7
    }

    const resortedDataTypes = [].concat(dataTypes).sort((a,b) => hcOrder[a.data__type] - hcOrder[b.data__type] )

    return (
      <div className="CollectionFilters__container">
        <div className="CollectionFilters__filtermobile_title d-flex align-items-center hidden-lg-up">
          <h2>{this.context.t('filters')}</h2>
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
              placeholder:this.context.t('search here') + '...'
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
          <a className="CollectionFilters__autocomplete_reset" onClick={() => onAutocompleteSelect('')}>{this.context.t('reset')}</a>


        </div>

        {!hideFilters && <div>
          {dataTypes &&
            <div className="CollectionFilters__reset_container d-flex align-items-center">
              <h5 className="CollectionFilters__reset_title">{this.context.t('type')}</h5>
              <a className="CollectionFilters__reset" onClick={onResetDataType}>{this.context.t('reset')}</a>
            </div>
          }
          <div className="CollectionFilters__filter_container d-flex flex-column">
            {dataTypes && resortedDataTypes.map(({ count, data__type }) => {
              const selected = typeof selectedDataTypes[data__type] !== 'undefined' || Object.keys(selectedDataTypes).length === 0
              return (
                  <div key={data__type} onClick={() => onToggleDataType(data__type)}
                       className={ selected ? 'CollectionFilters__filter_wrapper d-flex w-100 justify-content-between opacity-100' : 'CollectionFilters__filter_wrapper d-flex w-100 justify-content-between opacity-50'  }>

                    <p className="CollectionFilters__filter">{this.context.t(data__type)}</p>
                    <Badge className="CollectionFilters__filter_badge">
                      {isNull(count) ? '0' : count}
                    </Badge>
                  </div>
              )
            })}
          </div>
          <div className="CollectionFilters__reset_container d-flex align-items-center">
            <h5 className="CollectionFilters__reset_title">{this.context.t('period')}</h5>
            <a className="CollectionFilters__reset" onClick={onResetYear}>{this.context.t('reset')}</a>
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

CollectionFilters.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default CollectionFilters
