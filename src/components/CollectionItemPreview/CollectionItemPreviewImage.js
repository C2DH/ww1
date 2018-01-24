import React from 'react';
import ReactDOM from 'react-dom';
import ZoomControl from '../../components/ZoomControl'
// import WhiteTooltip from '../../components/WhiteTooltip'
import CollectionItemDownload from '../CollectionItemDownload'
import { Map, TileLayer, ImageOverlay } from 'react-leaflet'
import L from 'leaflet';

var yx = L.latLng;

var xy = function(x, y) {
	if (L.Util.isArray(x)) {    // When doing xy([x, y]);
		return yx(x[1], x[0]);
	}
	return yx(y, x);  // When doing xy(x, y);
};


export default class CollectionItemPreviewImage extends React.PureComponent {
  state = {
		zooming: false,
    zoom: -1,
		width: null,
		height: null
  }

  zoomTo = (zoom) => {
		if (!this.state.zooming) {
	    this.setState({ zoom })
		}
  }

	// #TODO: here we could set min zoom based on doc vs viewport sizes
	// componentDidMount(){
	// 	this.measure()
	// }
	// measure = () => {
	// 	const node = ReactDOM.findDOMNode(this)
	// 	const width = node.parentNode.clientWidth
	// 	const height = node.parentNode.clientHeight
	// 	this.setState({ width, height })
	// }

	// componentWillReceiveProps(nextProps, ownProps){
	// 	console.log("doc", nextProps.doc)
	// }

	handleMapMove = (e) => {
		const zoom = e.target.getZoom()
		this.setState({zoom})
	}

  render() {
    const { doc } = this.props

    if(!doc || !doc.data.width){ return null }

    const { zoom } = this.state

    const bounds = [xy(0, 0), xy(doc.data.width, doc.data.height)];

    return (
    // <div className="CollectionItem__doc_container d-flex flex-column">
    <div className="CollectionItemPreview__doc_preview">
        {/* <img src={doc.src} alt={doc.title} className="img-fluid" style={{maxHeight:'70vh'}}/> */}
			<div className="CollectionItemPreview__leaflet_wrapper d-flex">
        <Map
					onZoomStart={() => this.setState({ zooming: true })}
					onZoomEnd={() => this.setState({ zooming: false })}
          minZoom={-2.5}
          maxZoom={3}
          zoomControl={false}
          zoomSnap={0.2}
          attributionControl={false}
          crs = {L.CRS.Simple} bounds={bounds} maxBounds={bounds} zoom={zoom}
          center={xy(doc.data.width/2, doc.data.height/2)}
					onMoveend={this.handleMapMove}
          style={{display:'flex', flexGrow:'1', width:'100%', background: 'transparent'}}>

          <ImageOverlay
            bounds={bounds}
            url={doc.src}/>
        </Map>
			</div>
      <div className="CollectionItem__doc_controls">
        <ZoomControl zoom={zoom} maxZoom={3} minZoom={-2.5} zoomTo={this.zoomTo} reset={this.context.t('reset')}/>
        {/* <WhiteTooltip target="CollectionItem__btn_download" tooltipText={<span>Download image and data<br/>Download image</span>} /> */}
				<CollectionItemDownload doc={doc} className="CollectionItem__btn_download"/>

      </div>
    </div>
  );
  }
}

CollectionItemPreviewImage.contextTypes = {
  t: React.PropTypes.func.isRequired
}
