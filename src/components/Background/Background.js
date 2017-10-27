import React from 'react';
import * as d3Color from 'd3-color'
import { getBoundingBoxImage } from '../../utils'



export default class Background extends React.Component {
  render() {

    const { image, bbox, color='#fff', overlay=null } = this.props
    const imageUrl = getBoundingBoxImage(image, bbox)


    const baseStyle = {
      left: "0px",
      right: "0px",
      height: "100%",
      backgroundColor: overlay ? 'transparent' : color,
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      position: 'absolute',
      zIndex: 0
    }

    const overlayRgb = d3Color.color(overlay || 'transparent').rgb()

    const overlayStyle = {
      width: "100%",
      height: "100%",
      position: 'absolute',
      // backgroundColor: overlay ? overlay: 'transparent',
      opacity: 1,
      background: `linear-gradient(to bottom, rgba(${overlayRgb.r},${overlayRgb.g},${overlayRgb.b},1) 0%,rgba(${overlayRgb.r},${overlayRgb.g},${overlayRgb.b},0.7) 5%,rgba(${overlayRgb.r},${overlayRgb.g},${overlayRgb.b},0.7) 95%,rgba(${overlayRgb.r},${overlayRgb.g},${overlayRgb.b},1) 100%)`,
    }

    return (
      <div style={baseStyle}>
        {overlay && (
        <div style={overlayStyle}>
        </div>
      )}
      </div>
    );
  }
}
