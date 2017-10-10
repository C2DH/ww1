import React, { PureComponent } from 'react'
import { scaleLinear } from 'd3-scale'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Card, CardBlock } from 'reactstrap';
import ReactMapboxGl, { Popup, Marker, Layer, Feature, Cluster, ZoomControl, GeoJSONLayer, Source } from 'react-mapbox-gl'
import * as MapboxGL from 'mapbox-gl';

import {
  getPlaceTypeIcon,
} from '../../utils'

const fullHeight = { height: '100%', position:'relative'}

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
    fontWeight: 500
    // pointerEvents: 'none'
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
  accessToken: "pk.eyJ1IjoiZWlzY2h0ZXdlbHRrcmljaCIsImEiOiJjajRpYnR1enEwNjV2MndtcXNweDR5OXkzIn0._eSF2Gek8g-JuTGBpw7aXw"
})

const mapModuleStyle = { height:'100%', position:'relative' }


class ModuleMap extends PureComponent {

  state = {
    center: [6.087, 49.667],
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
    const { chapter, module } = this.props
    const { selectedDocument, center, zoom } = this.state

    if(!module || !module.objects){ return null }

    // #TODO: move to selectors
    const documents = (module.objects || []).map(o=>o.id)
    .map(doc => ({
      ...doc,
      coordinates: get(doc, 'data.coordinates.geometry.coordinates', [])
        .slice(0, 2)
        // For same position problem....
        .map(x => Number(x) + Math.random() / 1000)
        .reverse()
    }))

    return (
      <div style={ this.props.style || mapModuleStyle }>
        <div  className="Module__container">

          <Map
            // ref={map => this.map = map}
            center={center}
            dragRotate={false}
            keyboard={false}
            zoom={zoom}
            onDrag={this.onDrag}
            touchZoomRotate={false}
            style="mapbox://styles/eischteweltkrich/cj5cizaj205vv2qlegw01hubm"
            containerStyle={{
              height: module.caption ? "calc(100vh - 80px)" : "100%",
              width: "100%",
              top: 0,
              position: 'absolute'

            }}>
              <ZoomControl className="Map__ZoomControl"/>

              {documents && <Cluster ClusterMarkerFactory={this.clusterMarker} clusterThreshold={1} radius={60}>
              {
                documents.filter(doc => doc.data).map(doc => {
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

            {selectedDocument && (
              <Popup
                coordinates={selectedDocument.coordinates}
                anchor='bottom'
                offset={[0, -15]}
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

          { module.caption &&
          <div className="ModuleMap__Caption">
            <span>
              <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
              <span> {module.caption}</span>
            </span>
          </div>
          }


        </div>
      </div>
    )
  }
}


export default ModuleMap
