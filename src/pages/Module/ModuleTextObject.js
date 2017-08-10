import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, CardBlock } from 'reactstrap';
import {ModuleObjectContent} from './ModuleObject'
import { Converter } from 'showdown'

import Background from '../../components/Background'
import './Module.css'

const fullHeight = { height: '100%'}
const converter = new Converter()

const ObjectColumn = ({module}) => (
  <Col md="6" className="Module__textObject_Col">
    <ModuleObjectContent module={module}/>
  </Col>
)

const TextColumn = ({content,color}) => (
  <Col md="6"  className="Module__textObject_Col">
    <div className="Module__textObject_Text">
      <div style={{color: color}} className="" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  </Col>
)


class ModuleTextObject extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const content = converter.makeHtml(module.text.content)
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
