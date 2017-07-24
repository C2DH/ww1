import React from 'react'
import './ZoomControl.css'

const fixFloat = f => +(f.toFixed(2))
const INC = 0.2

const ZoomControl = ({zoom, maxZoom, minZoom, zoomTo}) => (
  <div className="ZoomControl__container">
    <button className="" disabled={fixFloat(zoom + INC) > 3} onClick={() => zoomTo(fixFloat(zoom + INC))}><i className="icon-zoom_in" /></button>
    <button className="" onClick={() => zoomTo(0.5)}>Reset</button>
    <button disabled={fixFloat(zoom - INC) < -1} className="ZoomControl__minus_btn" onClick={() => zoomTo(fixFloat(zoom - INC))}>
      <i className="icon-zoom_out" />
    </button>
  </div>
)

export default ZoomControl
