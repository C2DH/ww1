import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';

import Background from '../../components/Background'
import './Module.css'

const fullHeight = { height: '100%'}

class ModuleObject extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const cover = 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?h=350&auto=compress&cs=tinysrgb'
    const size = get(module, 'size', 'medium')

    let cardImgHeight = '400px'
    if(size === 'small'){
      cardImgHeight = '250px'
    }
    if(size === 'medium'){
      cardImgHeight = '400px'
    }
    if(size === 'big'){
      cardImgHeight = '90vh'
    }

    const objectStyle = {
      backgroundColor: get(module, 'background.color', '#fff'),
      alignItems: 'center',
    }

    const objectContainerStyle = {
      width: '100%',
      height: cardImgHeight,
      backgroundSize: 'cover',
      backgroundImage: `url(${cover})`
    }

    const ModuleObjectCard = () => (
      <div style={objectStyle} className="Module__container">
        <Card className="Module__objectCard">
          <div style={objectContainerStyle}></div>
          <CardBlock>
            <div className="d-inline-flex">
              <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
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
        <Background color={get(module, 'background.color')} />
          {(size === 'small') &&
            <Row style={fullHeight}>
              <Col md="4" />
              <Col md="4" style={fullHeight}>
                <ModuleObjectCard />
              </Col>
              <Col md="4" />
          </Row>}
          {(size === 'medium') &&
            <Row style={fullHeight}>
              <Col md="2" />
              <Col md="8">
                <ModuleObjectCard />
              </Col>
              <Col md="2" />
          </Row>}

         {(size === 'big') && <ModuleObjectCard />}
      </div>
    )
  }
}


export default ModuleObject
