import React from 'react'
import './ZoomControl.css'

const fixFloat = f => +(f.toFixed(2))
const INC = 0.2

const ZoomControl = ({zoom, maxZoom, minZoom, zoomTo}) => (
    <div className="ZoomControl__container">
      <button className="btn btn-secondary zoom" disabled={fixFloat(zoom - INC) < minZoom} onClick={() => zoomTo(fixFloat(zoom - INC))}>
        <i className="material-icons">zoom_out</i>
      </button>
      <button className="btn btn-secondary reset" onClick={() => zoomTo(minZoom)}>Reset</button>
      <button className="btn btn-secondary zoom" disabled={fixFloat(zoom + INC) > maxZoom} onClick={() => zoomTo(fixFloat(zoom + INC))}>
        <i className="material-icons">zoom_in</i>
      </button>
    </div>
)

export default ZoomControl
