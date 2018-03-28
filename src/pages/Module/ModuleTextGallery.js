import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import  ModuleGallery from './ModuleGallery'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'
import LastModule from '../../components/LastModule'

const fullHeight = { height: '100%'}
const galleryColumnsStyle = { height:'100%', position:'relative', width:'100%' }
const masonryStyle = {  height:'calc(100vh - 230px)', paddingTop:0, overflowY:'scroll' }

const GalleryColumn = ({module, chapter}) => (
  <Col xs="12" lg="6" className="Module__textObject_Col">
    <ModuleGallery module={module} chapter={chapter} style={galleryColumnsStyle} masonryStyle={masonryStyle}/>
  </Col>
)

const TextColumn = ({ content, color,position }) => (
  <Col xs="12" lg="6" className={`Module__textObject_Col text animated fadeIn${position}`}>
    <div className="Module__textObject_Text" style={{ color }}>
      <MarkdownGlossary content={content} />
    </div>
  </Col>
)


class ModuleTextGallery extends PureComponent {
  render() {
    const { chapter, module, lastModule } = this.props
    const { content, color} = module.text

    const backgroundColor = get(module, 'background.color')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox')
    let backgroundImage = get(module, 'background.object.id.attachment')
    backgroundImage = !backgroundImage?'':(bbox.length)?backgroundImage:get(module, 'background.object.id.data.resolutions.medium.url','')

    return (
      <div style={{height:'100%', position:'relative', overflowY:'auto'}}>
        <Background
          image={backgroundImage}
          color={backgroundColor}
          overlay={backgroundOverlay}
          bbox={bbox}
        />
        <Container fluid className="Module__container_obj">
          { module.layout === 'gallery-text' && (
            <Row className="Module__container_obj_row">
              <GalleryColumn chapter={chapter} module={module.gallery}/>
              <TextColumn content={content} color={module.text.color} position={'Up'}/>
            </Row>
          )}
          { module.layout === 'text-gallery' && (
            <Row className="Module__container_obj_row">
              <TextColumn content={content} color={module.text.color} position={'Up'}/>
              <GalleryColumn chapter={chapter} module={module.gallery}/>
            </Row>
          )}
        </Container>
        {
          lastModule && <LastModule backgroundColor={backgroundColor} backgroundOverlay={backgroundOverlay}></LastModule>
        }
      </div>
    )
  }
}


export default ModuleTextGallery
