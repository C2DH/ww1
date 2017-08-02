import React from 'react'
import './ZoomControl.css'

const fixFloat = f => +(f.toFixed(2))
const INC = 0.2

const ZoomControl = ({zoom, maxZoom, minZoom, zoomTo}) => (
  <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
    <div className="ZoomControl__container">
      <button disabled={fixFloat(zoom - INC) < minZoom} onClick={() => zoomTo(fixFloat(zoom - INC))}>
        <i className="icon-zoom_out" />
      </button>
      <button className="" onClick={() => zoomTo(minZoom)}>Reset</button>
      <button className="" disabled={fixFloat(zoom + INC) > maxZoom} onClick={() => zoomTo(fixFloat(zoom + INC))}>
        <i className="icon-zoom_in" />
      </button>
    </div>
  </div>
)

export default ZoomControl
