import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'
import ModuleTextObject from './ModuleTextObject'
import './Module.css'

import {
  getChapter,
  getModule,
} from '../../state/selectors'

const moduleContainerStyle = {
  height: '100vh',
}

const fakeModule = {
  text: {
    module: 'text',
    background: {
      color: '#333'
    },
    position: 'center',
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    }
  },

  object: {
    module : 'object',
    background: {
      color: '#333'
    },
    size: 'small',
    caption: "ciao ciao"
  },

  text_object: {
    module: 'text_object',
    background: {
      color: '#333'
    },
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    },
    object: {
      size: 'big',
      caption: 'hello!'
    }

  }
}

class Module extends PureComponent {
  render() {
    const { chapter, module } = this.props
    console.log(chapter, module)
    return <div style={moduleContainerStyle}>
      <ModuleText chapter={chapter} module={module}/>
      {/* <ModuleObject chapter={chapter} module={fakeModule.object}  /> */}
      {/* <ModuleTextObject chapter={chapter} module={fakeModule.text_object}  /> */}
    </div>
  }
}


const mapStateToProps = (state, props) => {
  const moduleIndex = props.match.params.moduleIndex
  return {
    chapter: getChapter(state),
    module: getModule(state, moduleIndex),
  }
}

export default connect(mapStateToProps)(Module)
