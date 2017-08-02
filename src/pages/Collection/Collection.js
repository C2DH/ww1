import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { keys, omit, isUndefined, isNull } from 'lodash'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import qs from 'query-string'
import {
  parseQsValue,
  parseQsBooleanValue,
  parseQsCommaListValue,
  parseQsCommaObjValue,
  objToCommaStr,
  makeOverlaps,
} from '../../utils'
import { isMobileScreen } from '../../breakpoints'
import {
  loadCollectionDocuments,
  loadCollectionDocumentsMeta,
  loadMoreCollectionDocuments,
  unloadCollectionDocuments,
  unloadCollectionDocumentsList,
  autocompleteCollectionSearch,
  autocompleteCollectionSetTerm,
  autocompleteCollectionClear,
} from '../../state/actions'
import {
  getCollectionDocuments,
  canLoadMoreCollectionDocuments,
  getCollectionDocumentsCount,
  getCollectionDocumentsLoading,
  getCollectionDocumentsTotalCount,
  getCollectionDocumentsDataTypesFacets,
  getCollectionDocumentsYearsFacets,
  getCollectionDocumentsFilteredYearsFacets,
  getCollectionDocumentsUncertainYears,
  getCollectionDocumentsAutocompleteResults,
  getCollectionDocumentsAutocompleteSearchTerm,
} from '../../state/selectors'

import CollectionMasonry from '../../components/CollectionMasonry'
import CollectionFilters from '../../components/CollectionFilters'
import Spinner from '../../components/Spinner'
import './Collection.css'

class Collection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sidebarOpen: !isMobileScreen(),
    }
  }

  componentDidMount() {
    this.props.loadCollectionDocumentsMeta()
    this.props.loadCollectionDocuments(this.getDocsParams())
    this.props.autocompleteCollectionSetTerm(this.props.searchString)
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

  handleAutocopleteSelect = (value, item) => {
    this.props.autocompleteCollectionSetTerm(value)
    this.props.autocompleteCollectionClear()
    const queryStirng = this.getQueryString({ searchString: value })
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

  toggleSidebarOpen = () => {
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
      autocompleteSearchTerm,
      autocompleteResults,
    } = this.props

    return (
      <div>
        <div className={this.state.sidebarOpen ? "Collection__List--sidebar-open" : 'Collection__List--sidebar-close'}>
          <div className={`Collection__List--list-heading d-flex align-items-center ${this.state.sidebarOpen ? 'Collection__List--list-heading-closed' : '' }`}>
            <h2>Collection</h2>
            <span className="Collection__items_shown hidden-md-down"><strong>{count} / {totalCount}</strong> ITEMS SHOWN</span>

            <button type="button" className="Collection__open_heading_btn btn btn-secondary" onClick={this.toggleSidebarOpen}>
              <i className="material-icons">{this.state.sidebarOpen ? 'chevron_right' : 'search'}</i>
            </button>
          </div>

          {(!documents && loading) && <div style={{ paddingTop: 120 }}>
            <Spinner />
          </div>}

          <div>
            {documents && <CollectionMasonry
              documents={documents}
              canLoadMore={canLoadMore && !loading}
              loadMore={this.loadMore}
              masonryStyle={{ paddingTop:120, paddingBottom: 20, outline: 'none' }}
            />}
          </div>

        </div>

        <CSSTransitionGroup
          component="div"
          transitionName="filters"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
          {this.state.sidebarOpen && (
            <CollectionFilters
              key="Collectionfilters"
              hideFilters={isNull(count)}
              toggleOpen={this.toggleSidebarOpen}
              searchString={autocompleteSearchTerm}
              onSearchChange={this.props.autocompleteCollectionSearch}
              autocompleteResults={autocompleteResults}
              onAutocompleteSelect={this.handleAutocopleteSelect}
              dataTypes={dataTypesFacets}
              selectedDataTypes={filterDataTypes}
              onResetDataType={this.resetFilterDataType}
              onToggleDataType={this.toggleFilterDataType}
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
        </CSSTransitionGroup>
      </div>
    )
  }
}

const DEFAULT_FILTER_YEARS = ['<1914', '1921>']

const mapStateToProps = (state, ownProps) => ({
  documents: getCollectionDocuments(state),
  canLoadMore: canLoadMoreCollectionDocuments(state),
  loading: getCollectionDocumentsLoading(state),
  // Query string mapping
  searchString: parseQsValue(ownProps.location, 'q', ''),
  filterDataTypes: parseQsCommaObjValue(ownProps.location, 'types'),
  filterYears: parseQsCommaListValue(ownProps.location, 'years', DEFAULT_FILTER_YEARS),
  filterUncertainYears: parseQsBooleanValue(ownProps.location, 'uncertainYears'),
  // Counts / facets stuff
  count: getCollectionDocumentsCount(state),
  totalCount: getCollectionDocumentsTotalCount(state),
  dataTypesFacets: getCollectionDocumentsDataTypesFacets(state),
  yearsFacets: getCollectionDocumentsYearsFacets(state),
  yearsFilteredFacets: getCollectionDocumentsFilteredYearsFacets(state),
  uncertainYears: getCollectionDocumentsUncertainYears(state),
  // Autocomplete
  autocompleteSearchTerm: getCollectionDocumentsAutocompleteSearchTerm(state),
  autocompleteResults: getCollectionDocumentsAutocompleteResults(state),
})

export default connect(mapStateToProps, {
  loadCollectionDocuments,
  loadCollectionDocumentsMeta,
  loadMoreCollectionDocuments,
  unloadCollectionDocuments,
  unloadCollectionDocumentsList,
  autocompleteCollectionSearch,
  autocompleteCollectionSetTerm,
  autocompleteCollectionClear,
})(Collection)
