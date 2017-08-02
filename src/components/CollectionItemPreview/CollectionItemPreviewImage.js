import React from 'react';
import ReactDOM from 'react-dom';
import ZoomControl from '../../components/ZoomControl'
// import WhiteTooltip from '../../components/WhiteTooltip'
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
    zoom: -1,
		width: null,
		height: null
  }

  zoomTo = (zoom) => {
    this.setState({zoom})
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

  render() {
    const { doc } = this.props

    if(!doc || !doc.data.width){ return null }

    const { zoom } = this.state

    const bounds = [xy(0, 0), xy(doc.data.width, doc.data.height)];

    return (
    // <div className="CollectionItem__doc_container d-flex flex-column">
		<div>
      <div className="CollectionItemPreview__doc_preview" style={{height:'80vh'}}>
        {/* <img src={doc.src} alt={doc.title} className="img-fluid" style={{maxHeight:'70vh'}}/> */}
        <Map
          minZoom={-2.5}
          maxZoom={3}
          zoomControl={false}
          zoomSnap={0.2}
          attributionControl={false}
          crs = {L.CRS.Simple} bounds={bounds} maxBounds={bounds} zoom={zoom}
          center={xy(doc.data.width/2, doc.data.height/2)}
          style={{height:'80vh', width:'100%', background: 'transparent'}}>
          <ImageOverlay
            bounds={bounds}
            url={doc.src}/>
        </Map>

      </div>
      <div className="CollectionItem__doc_controls">
        <ZoomControl zoom={zoom} maxZoom={3} minZoom={-2.5} zoomTo={this.zoomTo}/>

        {/* <WhiteTooltip target="CollectionItem__btn_download" tooltipText={<span>Download image and data<br/>Download image</span>} /> */}
        <button
          className="CollectionItem__btn_download"
          id="CollectionItem__btn_download"
          ><i className="icon-file_download" /></button>
      </div>
    </div>
  );
  }
}
