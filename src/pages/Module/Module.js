import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import ModuleText from './ModuleText'
import './Module.css'

import {
  getChapter,
  getModule,
} from '../../state/selectors'

const moduleContainerStyle = {
  height: '100vh',
}

class Module extends PureComponent {
  render() {
    const { chapter, module } = this.props
    console.log(chapter, module)
    return <div style={moduleContainerStyle}><ModuleText chapter={chapter} module={module}/></div>
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
