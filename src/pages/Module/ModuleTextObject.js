import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get, omit } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Card, CardImg, CardBlock } from 'reactstrap';
import { ModuleObjectContent } from './ModuleObject'
import { Origin } from 'redux-tooltip';
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'
import LastModule from '../../components/LastModule'


const fullHeight = { height: '100%'}

const ObjectColumn = ({module, position}) => (
  <Col md="6" className={`Module__textObject_Col mediumModule animated fadeIn${module.type=='image'?position:''}`}>
    <ModuleObjectContent module={module}/>
  </Col>
)

const TextColumn = ({ content, color, position }) => (
  <Col md="6"  className={`Module__textObject_Col animated fadeIn${position}`}>
    <div className="Module__textObject_Text" style={{ color }}>
      <MarkdownGlossary content={content}/>
    </div>
  </Col>
)


class ModuleTextObject extends PureComponent {
  render() {
    const { chapter, module, lastModule } = this.props
    const content = module.text.content
    const obj = {
      ...module.object,
      size: 'medium'
    }

    const backgroundColor = get(module, 'background.color')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')
    let backgroundImage = get(module, 'background.object.id.attachment')
    backgroundImage = !backgroundImage?'':(bbox.length)?backgroundImage:get(module, 'background.object.id.data.resolutions.medium.url','')
    console.log(obj)
    return (
      <div style={{height:'100%', position:'relative', overflowY: 'auto'}}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
      <Container fluid className="Module__container_obj">
          { module.layout == 'object-text' && (
            <Row style={fullHeight}>
              <ObjectColumn module={obj} position={'Left'}/>
              <TextColumn content={content} color={module.text.color} position={'Right'}/>
            </Row>
          )}
          { module.layout == 'text-object' && (
            <Row style={fullHeight}>
              <TextColumn content={content} color={module.text.color} position={'Left'} />
              <ObjectColumn module={obj} position={'Right'}/>
            </Row>
          )}
        </Container>
        {
          lastModule && <LastModule></LastModule>
        }
      </div>
    )
  }
}


export default ModuleTextObject
