import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container } from 'reactstrap'
import Background from '../../components/Background'
import MarkdownGlossary from '../../components/MarkdownGlossary'
import './Module.css'


class ModuleText extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const position = get(module, 'text.position')

    let alignItems = 'center'
    if (position === 'left') {
      alignItems = 'flex-start'
    } else if (position === 'right') {
      alignItems = 'flex-end'
    }

    const textStyle = {
      color: get(module, 'text.color', '#fff'),
      alignItems: alignItems,
      // #TODO: CHECK THIS
      // textAlign: position,
    }

    const backgroundColor = get(module, 'background.color')
    const backgroundImage = get(module, 'background.object.id.attachment')
    const backgroundOverlay = get(module, 'background.object.overlay')

    return <div style={{height:'100%', position:'relative'}}>
      <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />
      <div className="Module__container" style={textStyle}>
        <div className="Module__text">
          <MarkdownGlossary content={module.text.content}/>
        </div>
      </div>
    </div>
  }
}


export default ModuleText
