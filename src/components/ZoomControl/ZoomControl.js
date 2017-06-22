import React from 'react'
import './ZoomControl.css'

const ZoomControl = () => (
  <div className="ZoomControl__container">
    <button className="ZoomControl__plus_btn"><i className="fa fa-search-plus" /></button>
    <button className="ZoomControl__reset_btn">Reset</button>
    <button className="ZoomControl__minus_btn"><i className="fa fa-search-minus" /></button>
  </div>
)

export default ZoomControl
