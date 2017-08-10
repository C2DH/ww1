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

const TextColumn = ({content}) => (
  <Col md="6"  className="Module__textObject_Col">
    <div className="Module__textObject_Text">
      <div className="" dangerouslySetInnerHTML={{ __html: content }} />
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
      <div style={{height:'100%'}} className="Module__container">
        <Background color={get(module, 'background.color')} />
        <div>
          { module.layout == 'object-text' && (
            <Row style={fullHeight}>
              <div style={{height:400}}>
              <ObjectColumn module={obj}/>
              </div>
              <TextColumn content={content}/>
            </Row>
          )}
          { module.layout == 'text-object' && (
            <Row style={fullHeight}>
              <TextColumn content={content}/>
              <ObjectColumn module={obj}/>
            </Row>
          )}
        </div>
      </div>
    )
  }
}


export default ModuleTextObject
