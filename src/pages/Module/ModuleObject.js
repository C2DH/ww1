import React, { PureComponent } from 'react'
import { pure } from 'recompose'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';

import Background from '../../components/Background'

const fullHeight = { height: '100%'}

const ModuleObjectCard = pure(({ module }) => {
  const cover = get(module, 'id.attachment')
  const size = get(module, 'size', 'medium')

  let cardImgHeight = '400px'
  if (size === 'small') {
    cardImgHeight = '250px'
  } else if(size === 'medium') {
    cardImgHeight = '400px'
  } else if (size === 'big') {
    cardImgHeight = '90vh'
  }

  const objectStyle = {
    backgroundColor: 'transparent',
    alignItems: 'center',
  }

  const objectContainerStyle = {
    width: '100%',
    height: cardImgHeight,
    backgroundSize: 'cover',
    backgroundImage: `url(${cover})`
  }

  return (
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
})

class ModuleObject extends PureComponent {
  render() {
    const { chapter, module } = this.props

    const size = get(module, 'size')

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')

    return (
      <div style={fullHeight}>
        <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />

          {(size === 'small') &&
            <Row style={fullHeight}>
              <Col md="4" />
              <Col md="4" style={fullHeight}>
                <ModuleObjectCard module={module} />
              </Col>
              <Col md="4" />
          </Row>}

          {(size === 'medium') &&
            <Row style={fullHeight}>
              <Col md="2" />
              <Col md="8">
                <ModuleObjectCard module={module} />
              </Col>
              <Col md="2" />
          </Row>}

         {(size === 'big') && <ModuleObjectCard module={module} />}
      </div>
    )
  }
}


export default ModuleObject
