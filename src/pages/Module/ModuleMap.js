import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Card, CardBlock } from 'reactstrap';
import './Module.css'

const fullHeight = { height: '100%'}

class ModuleMap extends PureComponent {
  render() {
    const { chapter, module } = this.props

    // temporary styles for map
    const objectContainerStyle = {
      width: '100%',
      height: '90vh',
      backgroundColor: `red`,
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }

    const ModuleObjectCard = () => (
      <div  className="Module__container">
        <Card className="Module__objectCard">
          <div style={objectContainerStyle}><h1>MAP</h1></div>
          <CardBlock>
            <div className="d-inline-flex">
              <i className="icon-hand ModuleCarousel__caption_icon"  />
              <div className="Module__objectCard_text">
                {module.caption}
              </div>
            </div>
          </CardBlock>
        </Card>
      </div>

    )

    return (
      <div style={{height:'100%'}}>
        <ModuleObjectCard />
      </div>
    )
  }
}


export default ModuleMap
