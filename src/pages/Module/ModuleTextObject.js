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


const fullHeight = { height: '100%'}

const ObjectColumn = ({module}) => (
  <Col md="6" className="Module__textObject_Col mediumModule">
    <ModuleObjectContent module={module}/>
  </Col>
)

const TextColumn = ({ content, color }) => (
  <Col md="6"  className="Module__textObject_Col">
    <div className="Module__textObject_Text" style={{ color }}>
      <MarkdownGlossary content={content}/>
    </div>
  </Col>
)


class ModuleTextObject extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const content = module.text.content
    const obj = {
      ...module.object,
      size: 'medium'
    }

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')

    return (
      <div style={{height:'100%', position:'relative'}}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
      <Container fluid className="Module__container_obj">
          { module.layout == 'object-text' && (
            <Row style={fullHeight}>
              <ObjectColumn module={obj}/>
              <TextColumn content={content} color={module.text.color}/>
            </Row>
          )}
          { module.layout == 'text-object' && (
            <Row style={fullHeight}>
              <TextColumn content={content} color={module.text.color}/>
              <ObjectColumn module={obj}/>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}


export default ModuleTextObject
