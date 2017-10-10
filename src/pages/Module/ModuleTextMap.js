import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import  ModuleMap from './ModuleMap'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'

const fullHeight = { height: '100%'}
const mapColumnsStyle = { height:'100%', position:'relative', width:'100%' }

const MapColumn = ({module, chapter}) => (
  <Col md="6" className="Module__textObject_Col">
    <ModuleMap module={module} chapter={chapter} style={mapColumnsStyle}/>
  </Col>
)

const TextColumn = ({content}) => (
  <Col md="6" className="Module__textObject_Col">
    <div className="Module__textObject_Text">
      <MarkdownGlossary content={content}/>
    </div>
  </Col>
)


class ModuleTextMap extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const { content, color} = module.text

    return (
      <div style={{height:'100%', position:'relative'}}>
        <Background color={get(module, 'background.color')} />
        <Container fluid>
          { module.layout === 'map-text' && (
            <Row style={fullHeight}>
              <MapColumn chapter={chapter} module={module.map}/>
              <TextColumn content={content} color={color}/>
            </Row>
          )}
          { module.layout === 'text-map' && (
            <Row style={fullHeight}>
              <TextColumn content={content} color={module.text.color}/>
              <MapColumn chapter={chapter} module={module.map}/>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}


export default ModuleTextMap
