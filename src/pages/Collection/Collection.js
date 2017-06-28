import React, { PureComponent } from 'react'
import { isNull, get, zipObject, memoize, filter, keys, omit } from 'lodash'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import qs from 'query-string'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  loadDocuments,
  loadDocumentsMeta,
  loadMoreDocuments,
  unloadDocuments,
  unloadDocumentsMeta,
} from '../../state/actions'
import {
  getDocuments,
  canLoadMoreDocuments,
  getDocumentsCount,
  getDocumentsLoading,
  getDocumentsFacets,
  getDocumentsTotalCount,
} from '../../state/selectors'

import CollectionMasonry from '../../components/CollectionMasonry'
import CollectionFilters from '../../components/CollectionFilters'
import "./Collection.css"

const Range = Slider.Range

// class CollectionFilters extends PureComponent {
//   render() {
//     const {
//       onSearchChange,
//       searchString,
//       dataTypes,
//       selectedDataTypes,
//       onToggleDataType,
//       onYearChange,
//       selectedYears,
//     } = this.props
//     return (
//       <div style={{position:"fixed", width:"20%", top:0, bottom:0, left:"80%", backgroundColor:"red"}}>
//         <div>
//           <input onChange={onSearchChange} value={searchString} />
//         </div>
//         {dataTypes && dataTypes.map(({ count, data__type }) => (
//           <div key={data__type} onClick={() => onToggleDataType(data__type)}
//             style={{ backgroundColor: typeof selectedDataTypes[data__type] !== 'undefined' ? 'white' : 'transparent'  }}>
//             {data__type}
//             {' - '}
//             {count}
//           </div>
//         ))}
//         <div style={{ padding: '10px' }}>
//           <Range min={1914} max={1920} defaultValue={[1914, 1920]} onChange={onYearChange} value={selectedYears} />
//         </div>
//       </div>
//     )
//   }
// }

class Collection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: true
    }
  }

  componentDidMount() {
    this.props.loadDocumentsMeta()
    this.props.loadDocuments({
      q: this.props.searchString,
      exclude: this.getExclude(),
      filters: this.getFilters({
        filterDataTypes: this.props.filterDataTypes,
        filterYears: this.props.filterYears,
      })
    })
  }

  componentWillUnmount() {
    this.props.unloadDocuments()
    this.props.unloadDocumentsMeta()
  }

  componentWillReceiveProps(nextProps){
    if (
      nextProps.searchString !== this.props.searchString ||
      nextProps.filterDataTypes !== this.props.filterDataTypes ||
      nextProps.filterYears !== this.props.filterYears
    ) {
      this.props.unloadDocuments()
      this.props.loadDocuments({
        q: nextProps.searchString,
        exclude: this.getExclude(),
        filters: this.getFilters({
          filterDataTypes: nextProps.filterDataTypes,
          filterYears: nextProps.filterYears,
        })
      })
    }
  }

  getExclude = () => JSON.stringify({ data__type__in: ['person', 'event', 'glossary', 'place'] })

  getFilters = ({ filterDataTypes, filterYears }) => {
    const types = keys(filterDataTypes)

    let filtersObject = {}

    if (types.length) {
      filtersObject['data__type__in'] = types
    }

    // if (filterYears) {
    //   filtersObject['data__year__gte'] = filterYears[0]
    //   filtersObject['data__year__lt'] = filterYears[1]
    // }

    return JSON.stringify(filtersObject)
  }

  getQueryString = ({ searchString, filterDataTypes, filterYears, filterUncertainYears }) => {
    return `q=${searchString}&types=${objToCommaStr(filterDataTypes)}&years=${filterYears.join(',')}&uncertainYears=${filterUncertainYears ? '1' : '0'}`
  }

  loadMore = () => {
    this.props.loadMoreDocuments({
      q: this.props.searchString,
      exclude: this.getExclude(),
      filters: this.getFilters({
        filterDataTypes: this.props.filterDataTypes,
        filterYears: this.props.filterYears,
      })
    })
  }

  toggleOpen = () => {
    this.setState({
      sidebarOpen : !this.state.sidebarOpen
    })
  }

  handleOnYearChange = (filterYears) => {
    const { searchString, filterDataTypes, filterUncertainYears } = this.props
    const queryStirng = this.getQueryString({
      searchString,
      filterYears,
      filterUncertainYears,
      filterDataTypes,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  handleSearchStringChange = (e) => {
    const nextSearchString = e.target.value
    const { filterDataTypes, filterYears, filterUncertainYears } = this.props
    const queryStirng = this.getQueryString({
      filterDataTypes,
      filterYears,
      filterUncertainYears,
      searchString: nextSearchString,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  handleOnUncertainYearsChange = (showUncertain) => {
    const { filterDataTypes, filterYears, searchString } = this.props
    const queryStirng = this.getQueryString({
      filterDataTypes,
      filterYears,
      searchString,
      filterUncertainYears: showUncertain,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  toggleFilterDataType = (dataType) => {
    const { searchString, filterDataTypes, filterYears } = this.props
    const nextFilterDataTypes = typeof filterDataTypes[dataType] === 'undefined'
      ? { ...filterDataTypes, [dataType]: true }
      : omit(filterDataTypes, dataType)
    const queryStirng = this.getQueryString({
      searchString,
      filterYears,
      filterDataTypes: nextFilterDataTypes,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  render() {
    const {
      documents,
      loading,
      count,
      totalCount,
      canLoadMore,
      loadMoreDocuments,
      searchString,
      facets,
      filterDataTypes,
      filterYears,
      filterUncertainYears,
    } = this.props

    return (
    <div>
    <div className={this.state.sidebarOpen ? "Collection__List--sidebar-open" : ''}>
      <div className={`list-heading ${this.state.sidebarOpen ? 'list-heading-closed' : '' }`}>
        <h2>Collection</h2>
        <span className="Collection__items_shown"><strong>{count} / {totalCount}</strong> ITEMS SHOWN</span>
        <button className="Collection__open_heading_btn" onClick={this.toggleOpen}>{this.state.sidebarOpen ? <i className="fa fa-angle-right" /> : <i className="fa fa-search" />}</button>
      </div>

      {this.state.sidebarOpen && (
        <CollectionFilters
          searchString={searchString}
          onSearchChange={this.handleSearchStringChange}
          dataTypes={facets.data__type}
          selectedDataTypes={filterDataTypes}
          onToggleDataType={this.toggleFilterDataType}
          selectedYears={filterYears}
          onYearChange={this.handleOnYearChange}
          uncertainYears={filterUncertainYears}
          onUncertainYearsChange={this.handleOnUncertainYearsChange}
        />
      )}

      <div>
        {documents && <CollectionMasonry
          documents={documents}
          canLoadMore={canLoadMore && !loading}
          loadMore={this.loadMore}
          masonryStyle={{ paddingTop:120, paddingBottom: 20, outline: 'none' }}
        />}
      </div>
    </div>



    </div>
    )
  }
}

// TODO: Move in file such utils...
const parseSearchString = location => {
  const params = qs.parse(qs.extract(location.search))
  return get(params, 'q', '')
}

const objToCommaStr = obj => keys(obj).join(',')

const commaStrToObj = memoize(typesStr => {
  const types = filter(typesStr.split(','))
  return zipObject(types, types.map(_ => true))
})

const parseFilterDataTypes = location => {
  const params = qs.parse(qs.extract(location.search))
  return commaStrToObj(get(params, 'types', ''))
}

const commaStrToList = memoize(str => {
  const l = filter(str.split(','))
  if (l.length !== 2) {
    return [1914, 1921]
  }
  return l.map(l => +l)
})

const parseFilterYears = location => {
  const params = qs.parse(qs.extract(location.search))
  return commaStrToList(get(params, 'years', ''))
}

const parseFilterUncertain = location => {
  const params = qs.parse(qs.extract(location.search))
  return !!parseInt(get(params, 'uncertainYears', 1))
}

const mapStateToProps = (state, ownProps) => ({
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  totalCount: getDocumentsTotalCount(state),
  facets: getDocumentsFacets(state),
  loading: getDocumentsLoading(state),
  searchString: parseSearchString(ownProps.location),
  filterDataTypes: parseFilterDataTypes(ownProps.location),
  filterYears: parseFilterYears(ownProps.location),
  filterUncertainYears: parseFilterUncertain(ownProps.location),
})

export default connect(mapStateToProps, {
  loadDocuments,
  loadDocumentsMeta,
  loadMoreDocuments,
  unloadDocuments,
  unloadDocumentsMeta,
})(Collection)
