import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'
import LastModule from '../../components/LastModule'

class ModuleText extends PureComponent {
  render() {
    const { chapter, module, lastModule } = this.props
    const position = get(module, 'text.position')

    let offset = 0;
    let size = 6
    if (position === 'center') {
      offset = 3
    } else if (position === 'right') {
      offset = 6
    }

    const textStyle = {
      color: get(module, 'text.color', '#fff'),
      textAlign: position
    }

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')
    const bbox = get(module, 'background.object.bbox', [])

    return <div style={{height:'100%', position:'relative', overflowY: 'auto'}}>
      <Background
        image={backgroundImage}
        color={backgroundColor}
        overlay={backgroundOverlay}
        bbox={bbox}
      />
      <div>
          <Container fluid className="Module__container_text">
            <Row className="Module__container_text_overflow">
              <Col lg={{ size: size, offset: offset }} style={textStyle}>
                <div className="Module__container_text_overflow">
                  <MarkdownGlossary content={module.text.content}/>
                </div>
              </Col>
            </Row>
          </Container>
      </div>
      {
        lastModule && <LastModule></LastModule>
      }
    </div>
  }
}


export default ModuleText
