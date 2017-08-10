import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get, omit } from 'lodash'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Card, CardImg, CardBlock } from 'reactstrap';
import {ModuleObjectContent} from './ModuleObject'
import { Converter } from 'showdown'
import Markdown from 'markdown-to-jsx';
import { Origin } from 'redux-tooltip';
import {
  loadDocument,
  unloadDocument,
} from '../../state/actions'
import {
  getDocument,
  getDocumentLoading,
} from '../../state/selectors'


import Background from '../../components/Background'
import './Module.css'

const fullHeight = { height: '100%'}
const converter = new Converter()


const ObjectColumn = ({module}) => (
  <Col md="6" className="Module__textObject_Col">
    <ModuleObjectContent module={module}/>
  </Col>
)



class DescriptionContent extends React.PureComponent {

  componentDidMount(){
    console.log("p", this.props)
    // this.props.loadDocument(this.props.objectId)
  }
  componentWillUnmount(){
    // this.props.unloadDocument()
  }

  render(){
    const { doc } = this.props
    return (
      <div>Mayor of Differdange from 1912 - 1935.</div>
      // <div>xxx{doc && <span>{doc.data.description}</span>}</div>
    )
  }
}

const mapStateToProps = state => ({
  doc: getDocument(state),
  loading: getDocumentLoading(state),
})
// const DescriptionContent = connect(mapStateToProps, { loadDocument, unloadDocument})(DescriptionContentx)


class ObjectLink extends React.PureComponent {


  render(){
    const {href=''} = this.props
    if(href.indexOf('object://') === 0){
      const objectId = parseInt(href.replace('object://', ''))
      const passProps=omit(this.props, ['href', 'doc', 'unloadDocument', 'loadDocument', 'loading'])
      return (
        <a>
        <Origin content={<DescriptionContent objectId={objectId}/>}>{this.props.children}</Origin>
        </a>
      )
    } else {
      const passProps=omit(this.props, ['doc', 'unloadDocument', 'loadDocument', 'loading'])
      return (<a {...passProps}>{this.props.children}</a>)
    }

  }
}




const TextColumn = ({content}) => (
  <Col md="6"  className="Module__textObject_Col">
    <div className="Module__textObject_Text">
      <Markdown
        options={{
            overrides: {
                'a': {
                    component: ObjectLink,
                }
            },
        }}>
        {content || ``}
      </Markdown>
    </div>
  </Col>
)


class ModuleTextObject extends PureComponent {
  render() {
    const { chapter, module } = this.props
    const content = module.text.content
    const obj = {
      ...module.object,
      size: 'medium'
    }

    console.log(content)

    return (
      <div style={{height:'100%'}} className="Module__container">
        <Background color={get(module, 'background.color')} />
        <div>
          { module.layout == 'object-text' && (
            <Row style={fullHeight}>
              <ObjectColumn module={obj}/>
              <TextColumn content={content}/>
            </Row>
          )}
          { module.layout == 'text-object' && (
            <Row style={fullHeight}>
              <TextColumn content={content}/>
              <ObjectColumn module={obj}/>
            </Row>
          )}
        </div>
      </div>
    )
  }
}


export default ModuleTextObject
