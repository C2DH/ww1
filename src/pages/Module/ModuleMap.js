import React, { PureComponent } from 'react'
import { scaleLinear } from 'd3-scale'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Card, CardBlock } from 'reactstrap';
import * as d3Color from 'd3-color';
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl, GeoJSONLayer, Source } from 'react-mapbox-gl'
import * as MapboxGL from 'mapbox-gl';
import LastModule from '../../components/LastModule';
import Background from '../../components/Background'

import {
  getPlaceTypeIcon,
} from '../../utils'

const fullHeight = { height: '100%', position:'relative', overflowY:'auto'}

const circleScale = scaleLinear().range([30, 100]).domain([1, 150])

const styles = {
  clusterMarker: {
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#F56350',
    border: '2px solid white',
    fontWeight: 500,
    cursor:'pointer',
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    backgroundColor: '#ffffff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color:'#F56350',
    fontSize: '2rem',
    cursor:'pointer',
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
  scrollZoom: false,
  accessToken: "pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw"
})

class ModuleMap extends PureComponent {

  state = {
    center: [6.1008033, 49.8148384],
    zoom: [8],
    selectedDocument: null,
    selectedLayer: null,
    sideMenuOpen: true,
  }
  onDrag = () => this.setState({ selectedDocument: null })

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


  render() {
    const { chapter, module, lastModule } = this.props
    const { selectedDocument, center, zoom } = this.state


    const backgroundColor = get(module, 'background.color')
    const backgroundColorRgb = d3Color.color(backgroundColor || '#373a3c').rgb()

    const objectMapStyle = {
      backgroundImage: `linear-gradient(to bottom, rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},1) 0%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0.0) 5%,rgba(${backgroundColorRgb.r},${backgroundColorRgb.g},${backgroundColorRgb.b},0) 100%)`
    }

    if (!module || !module.objects) {
      return null
    }

    const documents = module.objects

    return (
      <div style={{height:'100%', position:'relative', overflowY: 'auto', width:'100%'}}>
        <div className="Map__Module_Container animated fadeIn">
            <Map
              ref={map => this.map = map}
              center={center}
              dragRotate={false}
              keyboard={false}
              zoom={zoom}
              onDrag={this.onDrag}
              injectCss={false}
              touchZoomRotate={false}
              style="mapbox://styles/eischteweltkrich/cj5cizaj205vv2qlegw01hubm"
              containerStyle={{
                flexGrow: 1
              }}>
                <ZoomControl className="Map__ZoomControl animated fadeIn"/>

                {documents && <Cluster
                  ClusterMarkerFactory={this.clusterMarker}
                  clusterThreshold={1}
                  radius={60}
                  zoomOnClick={true}
                  zoomOnClickPadding={50} >
                {
                  documents.filter(doc => doc.data).map(doc => {
                    const icon = getPlaceTypeIcon(doc.data.place_type)
                    return <Marker
                      key={doc.id}
                      className="animated fadeIn"
                      style={styles.marker}
                      onClick={() => this.onMarkerClick(doc)}
                      coordinates={doc.coordinates}>
                      <i className={icon.class}>{icon.content}</i>
                    </Marker>
                  })
                }
              </Cluster>}

              {selectedDocument && (
                <Popup
                  coordinates={selectedDocument.coordinates}
                  anchor='bottom'
                  offset={[0, -30]}
                  key={selectedDocument.id}>
                  <i className="material-icons pointer float-right" onClick={this.closePopup}>close</i>
                  <MapToolTip
                    className="clearfix"
                    snapshot={selectedDocument.snapshot}
                    title={selectedDocument.title}
                    text={selectedDocument.translated.description}
                  />
                </Popup>
              )}
            </Map>
            {(module.caption) &&
                <div className="Module__object_caption_text ModuleMap__Caption Module__gallery_carousel_caption animated fadeInDown">
                  <i className="icon-hand Module__object_caption_hand"  />
                  <div className="Module__object_caption_text_cont">
                    <p className="card-text">
                      {module.caption}
                    </p>
                  </div>
                </div>
              }

        </div>
        {
          lastModule && <LastModule backgroundColor={backgroundColor}></LastModule>
        }
      </div>
    )
  }
}


export default ModuleMap
