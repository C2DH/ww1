import React from 'react';


export default class Background extends React.Component {
  render() {

    const { image, color='#fff', overlay=null } = this.props


    const baseStyle = {
      width: "100%",
      height: "100%",
      backgroundColor: overlay ? 'transparent' : color,
      backgroundImage: `url(${image})`,
      backgroundSize: 'cover',
      position: 'fixed',
      zIndex: 0,
    }

    const overlayStyle = {
      width: "100%",
      height: "100%",
      position: 'absolute',
      backgroundColor: overlay ? overlay: 'transparent',
      opacity: 0.6,
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
