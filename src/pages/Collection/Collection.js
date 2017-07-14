import React, { PureComponent } from 'react'
import { isNull, get, zipObject, memoize, filter, keys, omit, isUndefined } from 'lodash'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import qs from 'query-string'
import matchMedia from 'matchmedia'
import {
  parseQsValue,
  parseQsBooleanValue,
  parseQsCommaNumListValue,
  parseQsCommaObjValue,
  objToCommaStr,
} from '../../utils'
import breakpoints from '../../breakpoints'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  loadCollectionDocuments,
  loadCollectionDocumentsMeta,
  loadMoreCollectionDocuments,
  unloadCollectionDocuments,
  unloadCollectionDocumentsList,
} from '../../state/actions'
import {
  getCollectionDocuments,
  canLoadMoreCollectionDocuments,
  getCollectionDocumentsCount,
  getCollectionDocumentsLoading,
  getCollectionDocumentsTotalCount,
  getCollectionDocumentsTotalFacets,
  getCollectionDocumentsDataTypesFacets,
  getCollectionDocumentsYearsFacets,
  getCollectionDocumentsFilteredYearsFacets,
  getCollectionDocumentsUncertainYears,
} from '../../state/selectors'

import CollectionMasonry from '../../components/CollectionMasonry'
import CollectionFilters from '../../components/CollectionFilters'
import "./Collection.css"

const Range = Slider.Range

class Collection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: !matchMedia(`screen and (max-width: ${breakpoints.md}px)`).matches,
    }
  }

  componentDidMount() {
    this.props.loadCollectionDocumentsMeta()
    this.props.loadCollectionDocuments(this.getDocsParams())
  }

  componentWillUnmount() {
    this.props.unloadCollectionDocuments()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.searchString !== this.props.searchString ||
      nextProps.filterDataTypes !== this.props.filterDataTypes ||
      nextProps.filterYears !== this.props.filterYears ||
      nextProps.filterUncertainYears !== this.props.filterUncertainYears
    ) {
      this.props.unloadCollectionDocumentsList()
      this.props.loadCollectionDocuments(this.getDocsParams({
        searchString: nextProps.searchString,
        filterDataTypes: nextProps.filterDataTypes,
        filterYears: nextProps.filterYears,
        filterUncertainYears: nextProps.filterUncertainYears,
      }))
    }
  }

  // Get filters or filter prop
  getFilters = (filters = {}) => {
    const { searchString, filterDataTypes, filterYears, filterUncertainYears } = filters
    return {
      searchString: isUndefined(searchString) ? this.props.searchString : searchString,
      filterYears: isUndefined(filterYears) ? this.props.filterYears : filterYears,
      filterDataTypes: isUndefined(filterDataTypes) ? this.props.filterDataTypes : filterDataTypes,
      filterUncertainYears: isUndefined(filterUncertainYears) ? this.props.filterUncertainYears : filterUncertainYears
    }
  }

  getDocsParams = (filters = {}) => {
    const { searchString, filterDataTypes, filterYears, filterUncertainYears } = this.getFilters(filters)
    const makeOverlaps = y => y ? `${y[0]}-01-01,${y[1]}-12-31` : undefined
    const filterDataTypesList = keys(filterDataTypes)

    const applyFilters = {}
    if (filterDataTypesList.length) {
      applyFilters.data__type__in = filterDataTypesList
    }
    if (!filterUncertainYears) {
      applyFilters.data__year__isnull = false
    }

    return {
      q: searchString,
      overlaps: makeOverlaps(filterYears),
      filters: applyFilters,
    }
  }

  getQueryString = (filters = {}) => {
    const { searchString, filterDataTypes, filterYears, filterUncertainYears } = this.getFilters(filters)
    return qs.stringify({
      q: searchString,
      types: objToCommaStr(filterDataTypes),
      years: filterYears.join(','),
      uncertainYears: filterUncertainYears ? '1' : '0'
    }, { encode: false })
  }

  handleSearchStringChange = (e) => {
    const searchString = e.target.value
    const queryStirng = this.getQueryString({ searchString })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  handleOnYearChange = (filterYears) => {
    const queryStirng = this.getQueryString({ filterYears })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  resetYearFilter = () => {
    const queryStirng = this.getQueryString({
      filterYears: DEFAULT_FILTER_YEARS,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  handleOnUncertainYearsChange = (filterUncertainYears) => {
    const queryStirng = this.getQueryString({ filterUncertainYears })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  toggleFilterDataType = (dataType) => {
    const { filterDataTypes } = this.props
    const nextFilterDataTypes = typeof filterDataTypes[dataType] === 'undefined'
      ? { ...filterDataTypes, [dataType]: true }
      : omit(filterDataTypes, dataType)
    const queryStirng = this.getQueryString({
      filterDataTypes: nextFilterDataTypes,
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  resetFilterDataType = () => {
    const queryStirng = this.getQueryString({
      filterDataTypes: {},
    })
    this.props.history.replace(`/collection?${queryStirng}`)
  }

  loadMore = () => {
    this.props.loadMoreCollectionDocuments(this.getDocsParams())
  }

  toggleOpen = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    })
  }

  render() {
    const {
      documents,
      loading,
      count,
      totalCount,
      canLoadMore,
      searchString,
      filterDataTypes,
      filterYears,
      filterUncertainYears,
      dataTypesFacets,
      yearsFacets,
      yearsFilteredFacets,
      uncertainYears,
    } = this.props

    return (
      <div>
        <div className={this.state.sidebarOpen ? "Collection__List--sidebar-open" : 'Collection__List--sidebar-close'}>
          <div className={`Collection__List--list-heading d-flex align-items-center ${this.state.sidebarOpen ? 'Collection__List--list-heading-closed' : '' }`}>
            <h2>Collection</h2>
            <span className="Collection__items_shown hidden-md-down"><strong>{count} / {totalCount}</strong> ITEMS SHOWN</span>

            <button type="button" className="Collection__open_heading_btn btn btn-secondary" onClick={this.toggleOpen}>
              <i className="material-icons">{this.state.sidebarOpen ? 'chevron_right' : 'search'}</i>
            </button>
          </div>


          <div>
            {documents && <CollectionMasonry
              documents={documents}
              canLoadMore={canLoadMore && !loading}
              loadMore={this.loadMore}
              masonryStyle={{ paddingTop:120, paddingBottom: 20, outline: 'none' }}
            />}
          </div>

        </div>
        {this.state.sidebarOpen && (
          <CollectionFilters
            searchString={searchString}
            toggleOpen={this.toggleOpen}
            onSearchChange={this.handleSearchStringChange}
            dataTypes={dataTypesFacets}
            selectedDataTypes={filterDataTypes}
            onToggleDataType={this.toggleFilterDataType}
            onResetDataType={this.resetFilterDataType}
            selectedYears={filterYears}
            onYearChange={this.handleOnYearChange}
            onResetYear={this.resetYearFilter}
            uncertainYears={filterUncertainYears}
            onUncertainYearsChange={this.handleOnUncertainYearsChange}
            yearsCounts={yearsFacets}
            yearsFilteredCounts={yearsFilteredFacets}
            uncertainYearsCount={uncertainYears}
          />
        )}
      </div>
    )
  }
}

const DEFAULT_FILTER_YEARS = [1914, 1921]

const mapStateToProps = (state, ownProps) => ({
  documents: getCollectionDocuments(state),
  canLoadMore: canLoadMoreCollectionDocuments(state),
  loading: getCollectionDocumentsLoading(state),
  // Query string mapping
  searchString: parseQsValue(ownProps.location, 'q', ''),
  filterDataTypes: parseQsCommaObjValue(ownProps.location, 'types'),
  filterYears: parseQsCommaNumListValue(ownProps.location, 'years', DEFAULT_FILTER_YEARS),
  filterUncertainYears: parseQsBooleanValue(ownProps.location, 'uncertainYears'),
  // Counts stuff
  count: getCollectionDocumentsCount(state),
  totalCount: getCollectionDocumentsTotalCount(state),
  dataTypesFacets: getCollectionDocumentsDataTypesFacets(state),
  yearsFacets: getCollectionDocumentsYearsFacets(state),
  yearsFilteredFacets: getCollectionDocumentsFilteredYearsFacets(state),
  uncertainYears: getCollectionDocumentsUncertainYears(state),
})

export default connect(mapStateToProps, {
  loadCollectionDocuments,
  loadCollectionDocumentsMeta,
  loadMoreCollectionDocuments,
  unloadCollectionDocuments,
  unloadCollectionDocumentsList,
})(Collection)
