import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import ReactMapboxGl, {  Marker, Feature, Cluster, ZoomControl } from 'react-mapbox-gl'
import MapSideMenu from '../../components/MapSideMenu'
import './MapPage.css'
import { loadMapDocuments, unloadMapDocuments } from '../../state/actions'
import {
  getMapDocuments,
  canLoadMoreMapDocuments,
  getMapDocumentsCount,
  getMapDocumentsLoading,
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
    this.props.loadMapDocuments()
  }

  componentWillUnmount() {
    this.props.unloadMapDocuments()
  }

  clusterMarker = (coordinates, pointCount) => (
    <Marker coordinates={coordinates} key={coordinates.toString()} style={styles.clusterMarker}>
      { pointCount }
    </Marker>
  )

  render() {
    const { documents } = this.props
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
            <span className="MapPage__items_shown"><strong>1 / 100</strong> ITEMS SHOWN</span>
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
                  documents.map(doc =>
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
            <MapSideMenu />
          </div>
        </div>
     </div>
    )
  }
}




const mapStateToProps = state => ({
  documents: getMapDocuments(state),
  canLoadMore: canLoadMoreMapDocuments(state),
  count: getMapDocumentsCount(state),
  loading: getMapDocumentsLoading(state),
})

export default connect(mapStateToProps, {
  loadMapDocuments,
  unloadMapDocuments,
})(MapPage)
