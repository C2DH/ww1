import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get, isUndefined, keys, omit, isNull } from 'lodash'
import { scaleLinear } from 'd3-scale'
import qs from 'query-string'
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl, GeoJSONLayer, Source } from 'react-mapbox-gl'
import * as MapboxGL from 'mapbox-gl';
import { Button, Popover, PopoverTitle, PopoverContent, ButtonGroup, ButtonToolbar, Modal, ModalHeader, ModalBody } from 'reactstrap';
import MapSideMenu from '../../components/MapSideMenu'
import CollectionItemLink from '../../components/CollectionItemLink'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import {Helmet} from "react-helmet";
import { isMobileScreen } from '../../breakpoints'
import Spinner from '../../components/Spinner'
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

const circleScale = scaleLinear().range([30, 100]).domain([1, 150])

const styles = {
  clusterMarker: {
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F56350',
    border: '2px solid white',
    fontWeight: 500,
    pointerEvents: 'none'
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#F56350',
    fontSize: '2rem',
    cursor:'pointer',
    // pointerEvents: 'none'
  }
}

const MapToolTip = ({ doc, snapshot, title, text }) => {
  const placeType = get(doc, 'type', '').toLowerCase()
  return (
    <div className="MapToolTip">
      <h5 className="MapToolTip__title">{title}</h5>
      {snapshot &&
        <div className="MapToolTip__img" style={{backgroundImage: `url(${snapshot})`}}>
          {placeType != 'entity' && (
            <div className="MapToolTip__img_link">
              <CollectionItemLink doc={doc} />
            </div>
          )}
        </div>
      }
      <p className="MapToolTip__text">{text}</p>
    </div>
  )
}

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw"
})


const LUXEMBOURG_BBOX = [2.1944545253,47.8493021543,10.4920501709,50.6313162083];
const sw = new MapboxGL.LngLat(2.1944545253,47.8493021543);
const ne = new MapboxGL.LngLat(10.4920501709,50.6313162083);
const llb = new MapboxGL.LngLatBounds(sw, ne);

class PositionControl extends React.PureComponent {

  state = {
    geolocating : false,
    showingModal: false,
  }

  handleClick = (e) => {
    if (navigator.geolocation) {
        this.setState({geolocating:true})
        return navigator.geolocation.getCurrentPosition(
          (pos) => {
            this.setState({geolocating:false})
            if(pos.coords && pos.coords.latitude){
              const center = [pos.coords.longitude, pos.coords.latitude]

              if(center[0] < LUXEMBOURG_BBOX[0] || center[0] > LUXEMBOURG_BBOX[2] || center[1] < LUXEMBOURG_BBOX[1] || center[1] > LUXEMBOURG_BBOX[3]){
                this.toggleModal()
              } else {
                this.props.setCenter(center)
              }
            }
          },
          (err) => {
            this.setState({geolocating:false})
          }
        )
    } else {

    }
  }

  toggleModal = () => {
    this.setState({
      showingModal: !this.state.showingModal,
    })
  }

  render(){
    const { setCenter } = this.props
    return (
      <div className={`Map__PositionControl ${this.state.geolocating ? 'Map__PositionControl--geolocating': '' }`} onClick={this.handleClick}>
        <i className="material-icons md-24">location_searching</i>

        <Modal isOpen={this.state.showingModal} toggle={this.toggleModal} zIndex="9999">
          <ModalHeader toggle={this.toggleModal} className="Map__Modal_title">Ooops</ModalHeader>
          <ModalBody>
            {this.context.t('you seem too far from Luxembourg')}...
          </ModalBody>
        </Modal>

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
            <Button className="Map__LayersControl__Button" active={currentLayer==='1914.geojson'} onClick={this.handleSetLayer('1914.geojson')}>{this.context.t('see 1914 borders')}</Button>
            {/*<Button className="Map__LayersControl__Button" active={currentLayer==='1920.geojson'} onClick={this.handleSetLayer('1920.geojson')}>{this.context.t('see 1920 borders')}</Button>*/}
            <Button className="Map__LayersControl__Button" active={currentLayer===null} onClick={this.handleSetLayer(null)}>{this.context.t('see today map')}</Button>
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
    center: [6.1008033, 49.8148384],
    zoom: [9],
    selectedDocument: null,
    selectedLayer: null,
    sideMenuOpen: !isMobileScreen()
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
    const applyExclude = {}

    if (placeTypesIn.length) {
      applyFilters.data__place_type__in = placeTypesIn
    }

    if (!includeUncertainYears) {
      applyExclude.data__year__iexact = 'uncertain'
    }

    return {
      q: searchString,
      overlaps: makeOverlaps(selectedYears),
      filters: applyFilters,
      exclude: applyExclude,
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

  clusterMarker = (coordinates, pointCount) => {
    const r = circleScale(pointCount)
    return <Marker coordinates={coordinates} key={coordinates.toString()} style={{
      ...styles.clusterMarker,
      width: r,
      height: r,
    }}>
      { pointCount }
    </Marker>
  }

  onMarkerClick = (doc) => {
    this.setState({
      selectedDocument: doc,
      center: doc.coordinates,
    })
  }

  closePopup = () => {
    this.setState({
      selectedDocument: null,
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
      loading,
    } = this.props

    const { selectedDocument, center, zoom } = this.state
    const linePaint: MapboxGL.LinePaint = {
      'line-color': '#F56350',
      'line-width': 3.5
    };

    const symbolLayout: MapboxGL.SymbolLayout = {
      'text-field': '{Territor}'
    };
    const symbolPaint: MapboxGL.SymbolPaint = {
      'text-color': '#F56350'
    };


    return (
      <div>
        <Helmet>
                <title>{this.context.t('map')}</title>
        </Helmet>
      <div className={this.state.sideMenuOpen ? "Collection__List--sidebar-open" : 'Collection__List--sidebar-close'}>
        <div className={`Collection__List--list-heading d-flex align-items-center ${this.state.sideMenuOpen ? 'Collection__List--list-heading-closed' : '' }`}>
            <h2>{this.context.t('map')}</h2>
            <span className="Collection__items_shown hidden-md-down">
              {(!isNull(totalCount)) &&
              <span>
                <strong>{count} / {totalCount}</strong> {this.context.t('items shown')}
              </span>
              }
            </span>

            <button type="button" className="Collection__open_heading_btn btn btn-secondary" onClick={this.toggleSideMenuOpen}>
              <i className="material-icons">{this.state.sideMenuOpen ? 'close' : 'search'}</i>
            </button>
          </div>
        <div
          className={this.state.sideMenuOpen ? "MapPage__MainRow openMap" : 'MapPage__MainRow closeMap'}>
              {(loading) && <div className="MapPage__Spinner_container">
                <Spinner />
              </div>}
              <Map
                ref={map => this.map = map}
                center={center}
                dragRotate={false}
                keyboard={false}
                zoom={zoom}
                minZoom={8}
                maxBounds = {llb}
                onDrag={this.onDrag}
                touchZoomRotate={false}
                injectCss={false}
                style="mapbox://styles/eischteweltkrich/cj5cizaj205vv2qlegw01hubm"
                containerStyle={{
                  display: 'flex',
                  flexGrow: '1',
                  width:'100%',
                }}>
                  <ZoomControl position="topLeft" className="Map__ZoomControl"/>
                  <div className="Map__Controls">
                    <PositionControl setCenter={this.handleSetCenter}></PositionControl>
                    <LayersControl setLayer={this.handleSetLayer} currentLayer={this.state.selectedLayer}></LayersControl>

                  </div>
                  <Cluster maxZoom={13} ClusterMarkerFactory={this.clusterMarker} clusterThreshold={1} radius={60}>
                  {
                    documents.map(doc => {
                      const icon = getPlaceTypeIcon(doc.data.place_type)
                      return <Marker
                        key={doc.id}
                        style={styles.marker}
                        onClick={() => this.onMarkerClick(doc)}
                        coordinates={doc.coordinates}>
                        <span className={icon.class}>{icon.content}</span>
                      </Marker>
                    })
                  }
                </Cluster>

                { this.state.selectedLayer === '1914.geojson' && (
                    <GeoJSONLayer
                      symbolLayout={symbolLayout}
                      symbolPaint={symbolPaint}
                      linePaint={linePaint}
                      data="borders/1914.geojson"/>
                )}
                { /*this.state.selectedLayer === '1920.geojson' && (
                    <GeoJSONLayer
                      symbolLayout={symbolLayout}
                      symbolPaint={symbolPaint}
                      linePaint={linePaint}
                      data="borders/1920.geojson"/>
                  )*/}

                {selectedDocument && (
                  <Popup
                    coordinates={selectedDocument.coordinates}
                    anchor='bottom'
                    offset={[0, -30]}
                    key={selectedDocument.id}>
                    <i className="material-icons pointer float-right" onClick={this.closePopup}>close</i>
                    <MapToolTip
                      doc={selectedDocument}
                      className="clearfix"
                      snapshot={selectedDocument.snapshot}
                      title={selectedDocument.title}
                      text={selectedDocument.translated.description}
                    />
                  </Popup>
                )}
              </Map>
          </div>
        </div>
        <CSSTransitionGroup
          component="div"
          transitionName="filters"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}>
        {this.state.sideMenuOpen && (
            <MapSideMenu
              key="Collectionfilters"
              dataPlaceTypes={dataPlaceTypesFacets}
              selectedPlaceTypes={selectedPlaceTypes}
              hideFilters={isNull(count)}
              toggleOpen={this.toggleSideMenuOpen}
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
        )}
        </CSSTransitionGroup>
     </div>
    )
  }
}

// TODO: Make a consts file...
const DEFAULT_FILTER_YEARS = ['<1914', '1921>']
const emptyList = []

const mapStateToProps = (state, ownProps) => ({
  documents: getMapDocuments(state) || emptyList,
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

MapPage.contextTypes = {
  t: React.PropTypes.func.isRequired
}

LayersControl.contextTypes = {
  t: React.PropTypes.func.isRequired
}

PositionControl.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  loadMapDocuments,
  loadMapDocumentsMeta,
  unloadMapDocumentsList,
  unloadMapDocuments,
  autocompleteMapClear,
  autocompleteMapSetTerm,
  autocompleteMapSearch,
})(MapPage)
