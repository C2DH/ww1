import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isUndefined, keys, omit } from 'lodash'
import qs from 'query-string'
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl } from 'react-mapbox-gl'
import MapSideMenu from '../../components/MapSideMenu'
import './MapPage.css'
import {
  parseQsValue,
  parseQsBooleanValue,
  parseQsCommaListValue,
  parseQsCommaObjValue,
  objToCommaStr,
  getPlaceTypeIcon,
  makeOverlaps,
} from '../../utils'
import {
  loadMapDocuments,
  loadMapDocumentsMeta,
  unloadMapDocuments,
  unloadMapDocumentsList,
  autocompleteMapSetTerm,
  autocompleteMapSearch,
  autocompleteMapClear,
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
  getMapDocumentsAutocompleteSearchTerm,
  getMapDocumentsAutocompleteResults,
} from '../../state/selectors'

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F56350',
    border: '2px solid white',
    fontWeight: 500
    // pointerEvents: 'none'
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
    // pointerEvents: 'none'
  }
}

const MapToolTip = ({ snapshot, title, text }) => (
  <div className="MapToolTip">
    {snapshot && <div className="MapToolTip__img" style={{background: `url(${snapshot})`}}/>}
    <h5 className="MapToolTip__title">{title}</h5>
    <p className="MapToolTip__text">{text}</p>
  </div>

)

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw"
})


class MapPage extends PureComponent {
  state = {
    center: [6.087, 49.667],
    zoom: [8],
    selectedDocument: null,
  }

  componentDidMount() {
    this.props.loadMapDocumentsMeta()
    this.props.loadMapDocuments(this.getDocsParams())
    this.props.autocompleteMapSetTerm(this.props.searchString)
  }

  componentWillUnmount() {
    this.props.unloadMapDocuments()
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.searchString !== this.props.searchString ||
      nextProps.selectedPlaceTypes !== this.props.selectedPlaceTypes ||
      nextProps.selectedYears !== this.props.selectedYears ||
      nextProps.includeUncertainYears !== this.props.includeUncertainYears
    ) {
      this.props.unloadMapDocumentsList()
      this.props.loadMapDocuments(this.getDocsParams({
        searchString: nextProps.searchString,
        selectedPlaceTypes: nextProps.selectedPlaceTypes,
        selectedYears: nextProps.selectedYears,
        includeUncertainYears: nextProps.includeUncertainYears,
      }))
    }
    if (this.props.documents !== nextProps.documents) {
      this.setState({ selectedDocument: null })
    }
  }

  // Get filters or filter prop
  getFilters = (filters = {}) => {
    return [
      'selectedPlaceTypes',
      'includeUncertainYears',
      'selectedYears',
      'searchString',
    ].reduce((r, filter) => ({
      ...r,
      [filter]: isUndefined(filters[filter]) ? this.props[filter] : filters[filter]
    }), {})
  }

  // Get parameters for API call
  getDocsParams = (filters = {}) => {
    const { selectedPlaceTypes, includeUncertainYears, selectedYears, searchString } = this.getFilters(filters)
    const placeTypesIn = keys(selectedPlaceTypes)

    const applyFilters = {}
    if (placeTypesIn.length) {
      applyFilters.data__place_type__in = placeTypesIn
    }
    if (!includeUncertainYears) {
      applyFilters.data__year__isnull = false
    }

    return {
      q: searchString,
      overlaps: makeOverlaps(selectedYears),
      filters: applyFilters,
    }
  }

  // Get querystring to push
  getQueryString = (filters = {}) => {
    const { selectedPlaceTypes, includeUncertainYears, selectedYears, searchString } = this.getFilters(filters)
    return qs.stringify({
      q: searchString,
      types: objToCommaStr(selectedPlaceTypes),
      years: selectedYears.join(','),
      uncertainYears: includeUncertainYears ? '1' : '0'
    }, { encode: false })
  }

  handleAutocopleteSelect = (value, item) => {
    this.props.autocompleteMapSetTerm(value)
    this.props.autocompleteMapClear()
    const queryStirng = this.getQueryString({ searchString: value })
    this.props.history.replace(`/map?${queryStirng}`)
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

  onMarkerClick = (doc) => {
    this.setState({
      selectedDocument: doc,
      zoom: [10],
      center: doc.coordinates,
    })
  }

  onDrag = () => this.setState({ selectedDocument: null })

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
      autocompleteSearchTerm,
      autocompleteResults,
    } = this.props

    const { selectedDocument, center, zoom } = this.state

    return (

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
              <Map
                center={center}
                trackResize={false}
                dragRotate={false}
                keyboard={false}
                zoom={zoom}
                onDrag={this.onDrag}
                touchZoomRotate={false}
                style="mapbox://styles/eischteweltkrich/cj5cizaj205vv2qlegw01hubm"
                containerStyle={{
                  height: "calc(100vh - 100px)",
                  width: "100%",
                  paddingtop: "100px"
                }}>
                  {/*<ZoomControl />*/}
                  {documents && <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={1} radius={60}>
                  {
                    documents.map(doc =>
                      <Marker
                        key={doc.id}
                        style={styles.marker}
                        onClick={() => this.onMarkerClick(doc)}
                        coordinates={doc.coordinates}>
                        <i className="material-icons">{getPlaceTypeIcon(doc.data.place_type)}</i>
                      </Marker>
                    )
                  }
                </Cluster>}
                {selectedDocument && (
                  <Popup
                    coordinates={selectedDocument.coordinates}
                    offset={[0, -50]}
                    style={{boxShadow: '0 2px 5px 5px rgba(0,0,0,0.11)'}}
                    key={selectedDocument.id}>
                    <MapToolTip
                      snapshot={selectedDocument.snapshot}
                      title={selectedDocument.title}
                      text={selectedDocument.translated.description}
                    />
                  </Popup>
                )}
              </Map>
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
              searchString={autocompleteSearchTerm}
              onSearchChange={this.props.autocompleteMapSearch}
              autocompleteResults={autocompleteResults}
              onAutocompleteSelect={this.handleAutocopleteSelect}
            />
          </div>
        </div>
     </div>
    )
  }
}

// TODO: Make a consts file...
const DEFAULT_FILTER_YEARS = ['<1914', '1921>']

const mapStateToProps = (state, ownProps) => ({
  documents: getMapDocuments(state),
  loading: getMapDocumentsLoading(state),
  // Query string mapping
  searchString: parseQsValue(ownProps.location, 'q', ''),
  selectedPlaceTypes: parseQsCommaObjValue(ownProps.location, 'types'),
  selectedYears: parseQsCommaListValue(ownProps.location, 'years', DEFAULT_FILTER_YEARS),
  includeUncertainYears: parseQsBooleanValue(ownProps.location, 'uncertainYears'),
  // Count / facets stuff
  count: getMapDocumentsCount(state),
  totalCount: getMapDocumentsTotalCount(state),
  dataPlaceTypesFacets: getMapDocumentsDataPlaceTypesFacets(state),
  yearsFacets: getMapDocumentsYearsFacets(state),
  yearsFilteredFacets: getMapDocumentsFilteredYearsFacets(state),
  uncertainYears: getMapDocumentsUncertainYears(state),
  // Autocomplete
  autocompleteSearchTerm: getMapDocumentsAutocompleteSearchTerm(state),
  autocompleteResults: getMapDocumentsAutocompleteResults(state),
})

export default connect(mapStateToProps, {
  loadMapDocuments,
  loadMapDocumentsMeta,
  unloadMapDocumentsList,
  unloadMapDocuments,
  autocompleteMapClear,
  autocompleteMapSetTerm,
  autocompleteMapSearch,
})(MapPage)
