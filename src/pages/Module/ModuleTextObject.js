import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';

import Background from '../../components/Background'
import './Module.css'

const fullHeight = { height: '100%'}

class ModuleTextObject extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const cover = 'https://images.pexels.com/photos/416676/pexels-photo-416676.jpeg?h=350&auto=compress&cs=tinysrgb'

    const cardImgHeight = '400px'

    const textObjectStyle = {
      backgroundColor: get(module, 'background.color', '#fff'),
      alignItems: 'center',
    }

    const textStyle={
      position: 'relative',
      height: '100%',
      width: '100%',
      zIndex: '1',
      color: get(module, 'text.color', '#fff'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }


    const objectContainerStyle = {
      width: '100%',
      height: cardImgHeight,
      backgroundSize: 'cover',
      backgroundImage: `url(${cover})`
    }

    const ModuleTextObjectCard = () => (

        <Card className="Module__textObjectCard">
          <div style={objectContainerStyle}></div>
          <CardBlock>
            <div className="d-inline-flex">
              <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
              <div className="Module__objectCard_text">
                {module.object.caption}
              </div>
            </div>
          </CardBlock>
        </Card>

    )

    return (
      <div style={{height:'100%'}}>
        <Background color={get(module, 'background.color')} />
        <div style={textObjectStyle} className="Module__container">
            <Row style={fullHeight}>
              <Col md="6"  className="Module__textObject_Col">
                <div style={textStyle} className="Module__textObject_Text">
                  {module.text.content}
                </div>
              </Col>
              <Col md="6" className="Module__textObject_Col">
                <ModuleTextObjectCard />
              </Col>
          </Row>
        </div>
      </div>
    )
  }
}


export default ModuleTextObject
