import React, { PureComponent } from 'react'
import * as d3Color from 'd3-color'
import { getBoundingBoxImage } from '../../utils'

export default class Background extends PureComponent {
  render() {
    const { image, bbox, color = 'transparent', overlay = null } = this.props

    // Make the background image
    let backgroundImage
    if (image) {
      const imageUrl = getBoundingBoxImage(image, bbox)
      backgroundImage = `url(${imageUrl})`
    }

    const baseStyle = {
      backgroundImage,
      left: "0px",
      right: "0px",
      height: "100%",
      backgroundColor: overlay ? 'transparent' : color,
      backgroundSize: 'cover',
      position: 'absolute',
      backgroundPosition:'center center',
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
    )
  }
}
