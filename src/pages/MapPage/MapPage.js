import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isUndefined, keys, omit } from 'lodash'
import qs from 'query-string'
import ReactMapboxGl, {  Marker, Feature, Cluster, ZoomControl } from 'react-mapbox-gl'
import MapSideMenu from '../../components/MapSideMenu'
import './MapPage.css'
import {
  parseQsBooleanValue,
  parseQsCommaNumListValue,
  parseQsCommaObjValue,
  objToCommaStr,
  makeOverlaps,
} from '../../utils'
import {
  loadMapDocuments,
  loadMapDocumentsMeta,
  unloadMapDocuments,
  unloadMapDocumentsList,
} from '../../state/actions'
import {
  getMapDocuments,
  getMapDocumentsLoading,
  getMapDocumentsCount,
  getMapDocumentsTotalCount,
  getMapDocumentsDataPlaceTypesFacets,
  getMapDocumentsYearsFacets,
  getMapDocumentsFilteredYearsFacets,
  getMapDocumentsUncertainYears,
} from '../../state/selectors'

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#51D5A0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    border: '2px solid #56C498',
    pointerEvents: 'none'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#E0E0E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #C9C9C9',
    pointerEvents: 'none'
  }
}


class MapPage extends PureComponent {
  componentDidMount() {
    this.props.loadMapDocumentsMeta()
    this.props.loadMapDocuments(this.getDocsParams())
  }

  componentWillUnmount() {
    this.props.unloadMapDocuments()
  }

  componentWillReceiveProps(nextProps) {
    if (
      // nextProps.searchString !== this.props.searchString ||
      nextProps.selectedPlaceTypes !== this.props.selectedPlaceTypes ||
      nextProps.selectedYears !== this.props.selectedYears ||
      nextProps.includeUncertainYears !== this.props.includeUncertainYears
    ) {
      this.props.unloadMapDocumentsList()
      this.props.loadMapDocuments(this.getDocsParams({
        // searchString: nextProps.searchString,
        selectedPlaceTypes: nextProps.selectedPlaceTypes,
        selectedYears: nextProps.selectedYears,
        includeUncertainYears: nextProps.includeUncertainYears,
      }))
    }
  }

  // Get filters or filter prop
  getFilters = (filters = {}) => {
    return [
      'selectedPlaceTypes',
      'includeUncertainYears',
      'selectedYears',
    ].reduce((r, filter) => ({
      ...r,
      [filter]: isUndefined(filters[filter]) ? this.props[filter] : filters[filter]
    }), {})
  }

  // Get parameters for API call
  getDocsParams = (filters = {}) => {
    const { selectedPlaceTypes, includeUncertainYears, selectedYears } = this.getFilters(filters)
    const placeTypesIn = keys(selectedPlaceTypes)

    const applyFilters = {}
    if (placeTypesIn.length) {
      applyFilters.data__place_type__in = placeTypesIn
    }
    if (!includeUncertainYears) {
      applyFilters.data__year__isnull = false
    }

    return {
      // q: searchString,
      overlaps: makeOverlaps(selectedYears),
      filters: applyFilters,
    }
  }

  // Get querystring to push
  getQueryString = (filters = {}) => {
    const { selectedPlaceTypes, includeUncertainYears, selectedYears } = this.getFilters(filters)
    return qs.stringify({
      // q: searchString,
      types: objToCommaStr(selectedPlaceTypes),
      years: selectedYears.join(','),
      uncertainYears: includeUncertainYears ? '1' : '0'
    }, { encode: false })
  }

  togglePlaceTypeSelection = placeType => {
    const { selectedPlaceTypes } = this.props
    const nextSelectedPlaceTypes = typeof selectedPlaceTypes[placeType] === 'undefined'
      ? { ...selectedPlaceTypes, [placeType]: true }
      : omit(selectedPlaceTypes, placeType)
    const queryStirng = this.getQueryString({
      selectedPlaceTypes: nextSelectedPlaceTypes,
    })
    this.props.history.replace(`/map?${queryStirng}`)
  }

  resetPlaceTypesSelection = () => {
    const queryStirng = this.getQueryString({
      selectedPlaceTypes: {},
    })
    this.props.history.replace(`/map?${queryStirng}`)
  }

  resetSelectedYears = () => {
    const queryStirng = this.getQueryString({
      selectedYears: DEFAULT_FILTER_YEARS,
    })
    this.props.history.replace(`/map?${queryStirng}`)
  }

  handleOnIncludeUncertainYearsChange = (includeUncertainYears) => {
    const queryStirng = this.getQueryString({ includeUncertainYears })
    this.props.history.replace(`/map?${queryStirng}`)
  }

  handleYearsSelectionChange = (selectedYears) => {
    const queryStirng = this.getQueryString({ selectedYears })
    this.props.history.replace(`/map?${queryStirng}`)
  }

  clusterMarker = (coordinates, pointCount) => (
    <Marker coordinates={coordinates} key={coordinates.toString()} style={styles.clusterMarker}>
      { pointCount }
    </Marker>
  )

  render() {
    const {
      documents,
      count,
      totalCount,
      dataPlaceTypesFacets,
      selectedPlaceTypes,
      yearsFacets,
      yearsFilteredFacets,
      uncertainYears,
      selectedYears,
      includeUncertainYears,
    } = this.props
    console.log(yearsFacets)

    return (
        //  {documents && <div>
        //   {documents.map(doc => (
        //     <pre key={doc.id}>{JSON.stringify(doc)}</pre>
        //   ))}
        // </div>}

      <div>
        <div className="MapPage__TopRow">
          <div className="list-heading list-heading-closed">
            <h2>Map</h2>
            <span className="MapPage__items_shown"><strong>{count} / {totalCount}</strong> ITEMS SHOWN</span>
            <button className="Collection__open_heading_btn" >
              <i className="icon-keyboard_arrow_right" />
            </button>
          </div>
        </div>
        <div className="MapPage__MainRow">
            <div style={{width: '80%'}}>
              <ReactMapboxGl
                style="mapbox://styles/mapbox/streets-v8"
                center={[6.087, 49.667]}
                zoom={[8]}
                accessToken="pk.eyJ1IjoiYmlhbmNoaW1ybyIsImEiOiJOY0FqNUxrIn0.C2YPVWz8M0nPeG2pZLybKQ"
                containerStyle={{
                  height: "100vh",
                  width: "100%",
                  paddingtop: "100px"
                }}>
                <ZoomControl />
                {documents && <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={1} radius={60}>
                {
                  [].map(doc =>
                    <Marker
                      key={doc.id}
                      style={styles.marker}
                      coordinates={doc.data.coordinates.geometry.coordinates.slice(0, 2).map(x => Number(x) + Math.random() / 1000).reverse()}>
                      M
                    </Marker>
                  )
                }
              </Cluster>}
               </ReactMapboxGl>
            </div>

          <div className="MapPage__Filters_container">
            <MapSideMenu
              dataPlaceTypes={dataPlaceTypesFacets}
              selectedPlaceTypes={selectedPlaceTypes}
              onTogglePlaceTypeSelection={this.togglePlaceTypeSelection}
              onResetSelectedPlaceTypes={this.resetPlaceTypesSelection}
              uncertainYearsCount={uncertainYears}
              includeUncertainYears={includeUncertainYears}
              onIncludeUncertainYearsChange={this.handleOnIncludeUncertainYearsChange}
              onResetSelectedYears={this.resetSelectedYears}
              selectedYears={selectedYears}
              onYearsSelectionChange={this.handleYearsSelectionChange}
              yearsCounts={yearsFacets}
              yearsFilteredCounts={yearsFilteredFacets}
            />
          </div>
        </div>
     </div>
    )
  }
}

// TODO: Make a consts file...
const DEFAULT_FILTER_YEARS = [1914, 1925]

const mapStateToProps = (state, ownProps) => ({
  documents: getMapDocuments(state),
  loading: getMapDocumentsLoading(state),
  // Query string mapping
  // searchString: parseQsValue(ownProps.location, 'q', ''),
  selectedPlaceTypes: parseQsCommaObjValue(ownProps.location, 'types'),
  selectedYears: parseQsCommaNumListValue(ownProps.location, 'years', DEFAULT_FILTER_YEARS),
  includeUncertainYears: parseQsBooleanValue(ownProps.location, 'uncertainYears'),
  // Count / facets stuff
  count: getMapDocumentsCount(state),
  totalCount: getMapDocumentsTotalCount(state),
  dataPlaceTypesFacets: getMapDocumentsDataPlaceTypesFacets(state),
  yearsFacets: getMapDocumentsYearsFacets(state),
  yearsFilteredFacets: getMapDocumentsFilteredYearsFacets(state),
  uncertainYears: getMapDocumentsUncertainYears(state),
})

export default connect(mapStateToProps, {
  loadMapDocuments,
  loadMapDocumentsMeta,
  unloadMapDocumentsList,
  unloadMapDocuments,
})(MapPage)
