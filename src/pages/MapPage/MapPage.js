import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { isUndefined, keys, omit } from 'lodash'
import qs from 'query-string'
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl, GeoJSONLayer, Source } from 'react-mapbox-gl'
import * as MapboxGL from 'mapbox-gl';
import { Button, Popover, PopoverTitle, PopoverContent, ButtonGroup, ButtonToolbar } from 'reactstrap';
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

class PositionControl extends React.PureComponent {

  state = {
    geolocating : false,
  }

  handleClick = (e) => {
    if (navigator.geolocation) {
        this.setState({geolocating:true})
        return navigator.geolocation.getCurrentPosition(
          (pos) => {
            if(pos.coords && pos.coords.latitude){
              const center = [pos.coords.longitude, pos.coords.latitude]
              console.log("setting", center)
              this.setState({geolocating:false})
              this.props.setCenter(center)
            }
          },
          (err) => {
            this.setState({geolocating:false})
          }
        )
    } else {

    }
  }

  render(){
    const { setCenter } = this.props
    return (
      <div className={`Map__PositionControl ${this.state.geolocating ? 'Map__PositionControl--geolocating': '' }`} onClick={this.handleClick}>
        <i className="material-icons md-24">location_searching</i>
      </div>
    )
  }
}

class LayersControl extends React.PureComponent {
  state = {
    popoverOpen : false
  }

  togglePopover = (e) => {
    this.setState({ popoverOpen: !this.state.popoverOpen })
  }

  handleSetLayer = (layer) => (e) => {
    const { setLayer } = this.props
    setLayer(layer)
    this.setState({ popoverOpen: false })
  }

  render(){
    const { currentLayer } = this.props
    return (
      <div>
      <div className="Map__LayersControl" id="Map__LayersControl" onClick={this.togglePopover}>
        <i className="material-icons md-24">layers</i>
      </div>
      <Popover placement={'right'} isOpen={this.state.popoverOpen} target="Map__LayersControl">
            <PopoverContent>
              <ButtonToolbar>
              <ButtonGroup vertical>
                <Button active={currentLayer==='1914.geojson'} onClick={this.handleSetLayer('1914.geojson')}>See 1914 borders</Button>
                <Button active={currentLayer==='1920.geojson'} onClick={this.handleSetLayer('1920.geojson')}>See 1920 borders</Button>
                <Button active={currentLayer===null} onClick={this.handleSetLayer(null)}>See today map</Button>
              </ButtonGroup>
              </ButtonToolbar>
            </PopoverContent>
      </Popover>
      </div>
    )

  }
}

class MapPage extends PureComponent {
  state = {
    center: [6.087, 49.667],
    zoom: [8],
    selectedDocument: null,
    selectedLayer: null,
    sideMenuOpen: true,
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

  toggleSideMenuOpen = () => {
    this.setState(prevState => ({
      sideMenuOpen: !prevState.sideMenuOpen,
    }), () => {
      // Manually trigger map resize!
      this.map.getChildContext().map.resize()
    })
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

  handleSetLayer = (layer) => this.setState({ selectedLayer: layer })
  handleSetCenter = (center) => this.setState({ center })

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
    const linePaint: MapboxGL.LinePaint = {
      'line-color': '#F56350'
    };

    const symbolLayout: MapboxGL.SymbolLayout = {
      'text-field': '{Territor}'
    };
    const symbolPaint: MapboxGL.SymbolPaint = {
      'text-color': '#F56350'
    };


    return (

      <div>
        <div className={`MapPage__TopRow`}>
          <div className={`list-heading list-heading-${this.state.sideMenuOpen ? 'closed' : 'open'}`}>
            <h2>Map</h2>
            <span className="MapPage__items_shown"><strong>{count} / {totalCount}</strong> ITEMS SHOWN</span>
            <button className="Collection__open_heading_btn" onClick={this.toggleSideMenuOpen}>
              {this.state.sideMenuOpen ? (
                <i className="icon-keyboard_arrow_right" />
              ) : (
                <i className="material-icons">search</i>
              )}
            </button>
          </div>
        </div>
        <div className="MapPage__MainRow">
            <div className={`MapPage__MapContainer--menu${this.state.sideMenuOpen ? 'Open' : 'Close'}`}>
              <Map
                ref={map => this.map = map}
                center={center}
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
                  <ZoomControl className="Map__ZoomControl"/>
                  <div className="Map__Controls">
                    <PositionControl setCenter={this.handleSetCenter}></PositionControl>
                    <LayersControl setLayer={this.handleSetLayer} currentLayer={this.state.selectedLayer}></LayersControl>

                  </div>
                  {documents && <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={1} radius={60}>
                  {
                    documents.map(doc => {
                      const icon = getPlaceTypeIcon(doc.data.place_type)
                      return <Marker
                        key={doc.id}
                        style={styles.marker}
                        onClick={() => this.onMarkerClick(doc)}
                        coordinates={doc.coordinates}>
                        <i className={icon.class}>{icon.content}</i>
                      </Marker>
                    })
                  }
                </Cluster>}

                { this.state.selectedLayer === '1914.geojson' && (
                    <GeoJSONLayer
                      symbolLayout={symbolLayout}
                      symbolPaint={symbolPaint}
                      linePaint={linePaint}
                      data="borders/1914.geojson"/>
                )}
                { this.state.selectedLayer === '1920.geojson' && (
                    <GeoJSONLayer
                      symbolLayout={symbolLayout}
                      symbolPaint={symbolPaint}
                      linePaint={linePaint}
                      data="borders/1914.geojson"/>
                )}

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

          {this.state.sideMenuOpen && (
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
          )}
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
