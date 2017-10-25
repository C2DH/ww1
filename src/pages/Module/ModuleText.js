import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container, Row, Col } from 'reactstrap'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'

class ModuleText extends PureComponent {
  render() {
    const { chapter, module } = this.props
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

    return <div style={{height:'100%', position:'relative'}}>
      <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />
      <div>
          <Container fluid className="Module__container_text">
            <Row>
              <Col lg={{ size: size, offset: offset }} style={textStyle}>
                <MarkdownGlossary content={module.text.content}/>
              </Col>
            </Row>
          </Container>
      </div>
    </div>
  }
}


export default ModuleText
