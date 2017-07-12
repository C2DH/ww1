import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { Container } from 'reactstrap'
import Background from '../../components/Background'
import './Module.css'


class ModuleText extends PureComponent {
  render() {
    const { chapter, module } = this.props

    let alignItems = 'center'
    const position = get(module, 'text.position', 'center')
    if(position === 'left'){
      alignItems = 'flex-start'
    }
    if(position === 'right'){
      alignItems = 'flex-end'
    }

    const textStyle={
      position: 'relative',
      height: '100%',
      width: '100%',
      zIndex: '1',
      color: get(module, 'text.color', '#000'),
      display: 'flex',
      flexDirection: 'column',
      alignItems: alignItems,
      justifyContent: 'center',
    }




    return <div style={{height:'100%'}}>
      <Background color={get(module, 'background.color')}/>
      <div style={textStyle}>
        {module.text.content}
      </div>
    </div>
  }
}


export default ModuleText
