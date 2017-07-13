import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import ModuleObject from './ModuleObject'

import './Module.css'

import {
  getChapter,
  getModule,
} from '../../state/selectors'

const moduleContainerStyle = {
  height: '100vh',
}

const fakeModule = {
  module : 'object',
  background: {
    color: '#333'
  },
  size: 'medium',
  caption: "ciao ciao"
}

class Module extends PureComponent {
  render() {
    const { chapter, module } = this.props
    console.log(chapter, module)
    return <div style={moduleContainerStyle}>
      {/* <ModuleText chapter={chapter} module={module}/> */}
      <ModuleObject chapter={chapter} module={fakeModule}  id="cucu"/>
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
