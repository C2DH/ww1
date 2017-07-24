import React from 'react'
import './ZoomControl.css'

const ZoomControl = ({zoom, maxZoom, minZoom, zoomTo}) => (
  <div className="ZoomControl__container">
    <button className="" onClick={zoomTo(zoom+0.2)}><i className="icon-zoom_in" /></button>
    <button className="" onClick={zoomTo(0.0)}>Reset</button>
    <button className="ZoomControl__minus_btn" onClick={zoomTo(zoom-0.2)}><i className="icon-zoom_out" /></button>
  </div>
)

export default ZoomControl
