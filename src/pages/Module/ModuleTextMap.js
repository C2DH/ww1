import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import  ModuleMap from './ModuleMap'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'
import LastModule from '../../components/LastModule'

const fullHeight = { height: '100%'}
 const mapColumnsStyle = { height:'100%', position:'relative', width:'100%' }

const MapColumn = ({module, chapter, position}) => (
  <Col md="6" className={`Module__textObject_Col mediumModule animated fadeIn${position}`}>
    <ModuleMap module={module} chapter={chapter} style={mapColumnsStyle}/>
  </Col>
)

const TextColumn = ({content, color, position}) => (
  <Col md="6" className={`Module__textObject_Col animated fadeIn${position}`}>
    <div className="Module__textObject_Text" style={{ color }}>
      <MarkdownGlossary content={content}/>
    </div>
  </Col>
)


class ModuleTextMap extends PureComponent {
  render() {
    const { chapter, module, lastModule } = this.props
    const { content, color} = module.text

    const backgroundColor = get(module, 'background.color')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')
    let backgroundImage = get(module, 'background.object.id.attachment')
    backgroundImage = !backgroundImage?'':(bbox.length)?backgroundImage:get(module, 'background.object.id.data.resolutions.medium.url','')

    return (
      <div style={{height:'100%', position:'relative'}}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
        <Container fluid className="Module__container_obj">
          { module.layout === 'map-text' && (
            <Row className="Module__container_obj_row">
              <MapColumn chapter={chapter} module={module.map} position={'Left'} />
              <TextColumn content={content} color={module.text.color} position={'Up'}/>
            </Row>
          )}
          { module.layout === 'text-map' && (
            <Row className="Module__container_obj_row">
              <TextColumn content={content} color={module.text.color} position={'Up'}/>
              <MapColumn chapter={chapter} module={module.map} position={'Right'}/>
            </Row>
          )}
          {lastModule &&
            <LastModule />
          }
        </Container>
      </div>
    )
  }
}


export default ModuleTextMap
