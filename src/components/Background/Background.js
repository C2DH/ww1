import React from 'react';


export default class Background extends React.Component {
  render() {

    const { image, color='#fff', overlay=null } = this.props


    const baseStyle = {
      left: "0px",
      right: "0px",
      height: "100%",
      backgroundColor: overlay ? 'transparent' : color,
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      position: 'absolute',
      zIndex: 0,
      filter:'grayscale(1)'
    }

    const overlayStyle = {
      width: "100%",
      height: "100%",
      position: 'absolute',
      backgroundColor: overlay ? overlay: 'transparent',
      opacity: 0.7,
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
