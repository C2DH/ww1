import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import  ModuleGallery from './ModuleGallery'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'

const fullHeight = { height: '100%'}
const galleryColumnsStyle = { height:'100%', position:'relative', width:'100%' }

const GalleryColumn = ({module, chapter}) => (
  <Col md="6" className="Module__textObject_Col">
    <ModuleGallery module={module} chapter={chapter} style={galleryColumnsStyle}/>
  </Col>
)

const TextColumn = ({content}) => (
  <Col md="6" className="Module__textObject_Col">
    <div className="Module__textObject_Text">
      <MarkdownGlossary content={content}/>
    </div>
  </Col>
)


class ModuleTextGallery extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const { content, color} = module.text

    console.log(module)

    return (
      <div style={{height:'100%', position:'relative'}}>
        <Background color={get(module, 'background.color')} />
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
