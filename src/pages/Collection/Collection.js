import React, { PureComponent } from 'react'
import { isNull, get, zipObject, memoize, filter, keys, omit } from 'lodash'
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
import "./Collection.css"

class CollectionFilters extends PureComponent {
  render() {
    const {
      onSearchChange,
      searchString,
      dataTypes,
      selectedDataTypes,
      onToggleDataType,
    } = this.props
    return (
      <div style={{position:"fixed", width:"20%", top:0, bottom:0, left:"80%", backgroundColor:"red"}}>
        <div>
          <input onChange={onSearchChange} value={searchString} />
        </div>
        {dataTypes && dataTypes.map(({ count, data__type }) => (
          <div key={data__type} onClick={() => onToggleDataType(data__type)}
            style={{ backgroundColor: typeof selectedDataTypes[data__type] !== 'undefined' ? 'white' : 'transparent'  }}>
            {data__type}
            {' - '}
            {count}
          </div>
        ))}
      </div>
    )
  }
}

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
        filterDataTypes: this.props.filterDataTypes
      })
    })
  }

  componentWillUnmount() {
    this.props.unloadDocuments()
    this.props.unloadDocumentsMeta()
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.searchString !== this.props.searchString) {
      this.props.unloadDocuments()
      this.props.loadDocuments({
        q: nextProps.searchString,
        exclude: this.getExclude(),
        filters: this.getFilters({
          filterDataTypes: this.props.filterDataTypes
        })
      })
    }
    if (nextProps.filterDataTypes !== this.props.filterDataTypes) {
      this.props.unloadDocuments()
      this.props.loadDocuments({
        q: this.props.searchString,
        exclude: this.getExclude(),
        filters: this.getFilters({
          filterDataTypes: nextProps.filterDataTypes
        })
      })
    }
  }

  getExclude = () => JSON.stringify({ data__type__in: ['person', 'event', 'glossary', 'place'] })

  getFilters = ({ filterDataTypes, filterYear }) => {
    const types = keys(filterDataTypes)

    let filtersObject = {}

    if (types.length) {
      filtersObject['data__type__in'] = types
    }

    if (filterYear) {
      filtersObject['year'] = filterYear
    }

    return JSON.stringify(filtersObject)
  }

  getQueryString = ({ searchString, filterDataTypes, year }) => {
    return `q=${searchString}&types=${objToCommaStr(filterDataTypes)}`
  }

  loadMore = () => {
    this.props.loadMoreDocuments({
      q: this.props.searchString,
      exclude: this.getExclude(),
      filters: this.getFilters({
        filterDataTypes: this.props.filterDataTypes
      })
    })
  }

  toggleOpen = () => {
    this.setState({
      sidebarOpen : !this.state.sidebarOpen
    })
  }

  handleSearchStringChange = (e) => {
    const nextSearchString = e.target.value
    const { filterDataTypes } = this.props
    const queryStirng = this.getQueryString({
      filterDataTypes,
      searchString: nextSearchString,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  toggleFilterDataType = (dataType) => {
    const { searchString, filterDataTypes } = this.props
    const nextFilterDataTypes = typeof filterDataTypes[dataType] === 'undefined'
      ? { ...filterDataTypes, [dataType]: true }
      : omit(filterDataTypes, dataType)
    const queryStirng = this.getQueryString({
      searchString,
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
    } = this.props

    return (
    <div>
    <div className={this.state.sidebarOpen ? "Collection__List--sidebar-open" : ''}>
      <div className={`list-heading ${this.state.sidebarOpen ? 'list-heading-closed' : '' }`}>
        <h1>Collection</h1>
        <button onClick={this.toggleOpen}>o</button>
      </div>

      {this.state.sidebarOpen && (
        <CollectionFilters
          searchString={searchString}
          onSearchChange={this.handleSearchStringChange}
          dataTypes={facets.data__type}
          selectedDataTypes={filterDataTypes}
          onToggleDataType={this.toggleFilterDataType}
        />
      )}

      <div>
        {documents && <CollectionMasonry
          documents={documents}
          canLoadMore={canLoadMore && !loading}
          loadMore={this.loadMore}
          masonryStyle={{ paddingTop:120, paddingBottom: 20 }}
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

const parseFilterDataTypes = memoize(location => {
  const params = qs.parse(qs.extract(location.search))
  return commaStrToObj(get(params, 'types', ''))
})

const mapStateToProps = (state, ownProps) => ({
  documents: getDocuments(state),
  canLoadMore: canLoadMoreDocuments(state),
  count: getDocumentsCount(state),
  totalCount: getDocumentsTotalCount(state),
  facets: getDocumentsFacets(state),
  loading: getDocumentsLoading(state),
  searchString: parseSearchString(ownProps.location),
  filterDataTypes: parseFilterDataTypes(ownProps.location),
})

export default connect(mapStateToProps, {
  loadDocuments,
  loadDocumentsMeta,
  loadMoreDocuments,
  unloadDocuments,
  unloadDocumentsMeta,
})(Collection)
