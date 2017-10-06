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
  <Col md="6" className="Module__textObject_Col">
    <ModuleObjectContent module={module}/>
  </Col>
)

const TextColumn = ({content}) => (
  <Col md="6"  className="Module__textObject_Col">
    <div className="Module__textObject_Text">
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

    return (
      <div style={{height:'100%', position:'relative'}}>
        <Background color={get(module, 'background.color')} />
        <Container fluid>
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
