import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'
import ModuleTextObject from './ModuleTextObject'
import ModuleGallery from './ModuleGallery'
import ModuleMap from './ModuleMap'
import ModuleMapText from './ModuleMapText'
import './Module.css'

import {
  getChapter,
  makeGetModule,
} from '../../state/selectors'

const moduleContainerStyle = {
  height: '100vh',
}

const getModuleComponent = moduleType => {
  switch (moduleType) {
    case 'text':
      return ModuleText
    case 'object':
      return ModuleObject
    case 'gallery':
      return ModuleGallery
    case 'map':
      return ModuleMap
    case 'text_object':
      return ModuleTextObject
    default:
      throw new Error(`Invalid module type ${moduleType}`)
  }
}

const fakeModule = {
  text: {
    module: 'text',
    background: {
      color: '#333'
    },
    position: 'left',
    text: {
      content: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. Donec rutrum congue leo eget malesuada. Donec sollicitudin molestie malesuada. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.'
    }
  },

  object: {
    module : 'object',
    background: {
      color: '#333'
    },
    size: 'medium',
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
    // console.log(chapter, module)
    return <div style={moduleContainerStyle}>
      {React.createElement(getModuleComponent(module.module), {
        chapter,
        module,
      })}
      {/* <ModuleText chapter={chapter} module={module}/> */}
      {/* <ModuleObject chapter={chapter} module={fakeModule.object}  /> */}
      {/* <ModuleTextObject chapter={chapter} module={fakeModule.text_object}  /> */}
      {/* <ModuleCarousel chapter={chapter} module={fakeModule.object} /> */}
      {/* <ModuleMap chapter={chapter} module={fakeModule.object} /> */}
      {/* <ModuleMapText chapter={chapter} module={fakeModule.text_object}  /> */}
    </div>
  }
}


const makeMapStateToProps = () => {
  const getModule = makeGetModule()
  const mapStateToProps = (state, props) => {
    const moduleIndex = props.match.params.moduleIndex
    return {
      chapter: getChapter(state),
      module: getModule(state, moduleIndex),
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps)(Module)
