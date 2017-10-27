import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import  ModuleGallery from './ModuleGallery'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'

const fullHeight = { height: '100%'}
const galleryColumnsStyle = { height:'100%', position:'relative', width:'100%' }
const masonryStyle = {  height:'calc(100vh - 100px)', paddingTop:80, overflowY:'scroll' }

const GalleryColumn = ({module, chapter}) => (
  <Col md="6" className="Module__textObject_Col">
    <ModuleGallery module={module} chapter={chapter} style={galleryColumnsStyle} masonryStyle={masonryStyle}/>
  </Col>
)

const TextColumn = ({ content, color }) => (
  <Col md="6" className="Module__textObject_Col">
    <div className="Module__textObject_Text">
      <MarkdownGlossary content={content} style={{ color }} />
    </div>
  </Col>
)


class ModuleTextGallery extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const { content, color} = module.text

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
        <Container fluid>
          { module.layout === 'gallery-text' && (
            <Row style={fullHeight}>
              <GalleryColumn chapter={chapter} module={module.gallery}/>
              <TextColumn content={content} color={color}/>
            </Row>
          )}
          { module.layout === 'text-gallery' && (
            <Row style={fullHeight}>
              <TextColumn content={content} color={module.text.color}/>
              <GalleryColumn chapter={chapter} module={module.gallery}/>
            </Row>
          )}
        </Container>
      </div>
    )
  }
}


export default ModuleTextGallery
