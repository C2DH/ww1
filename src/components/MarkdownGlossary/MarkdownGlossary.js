import React from 'react'
import { connect } from 'react-redux'
import { Converter } from 'showdown'
import Markdown from 'markdown-to-jsx';
import { get, omit } from 'lodash'
import { Origin } from 'redux-tooltip';


import * as api from '../../api'


const converter = new Converter()




// const mapStateToProps = state => ({
//   doc: getDocument(state),
//   loading: getDocumentLoading(state),
// })
// const DescriptionContent = connect(mapStateToProps, { loadDocument, unloadDocument})(DescriptionContentx)


class ObjectLink extends React.PureComponent {

  state = {
    doc : null
  }

  componentDidMount(){

    const {href=''} = this.props
    if(href.indexOf('object://') === 0){
      const objectId = parseInt(href.replace('object://', ''))
      if(!objectId || isNaN(objectId)){
        return
      }
      api.getDocument(objectId)
      .then(doc => {
        this.setState({doc})
      })
    }
  }

  render(){
    const {href=''} = this.props
    if(this.state.doc){
      return (
        <Origin content={`${this.state.doc.description}`}>{this.props.children}</Origin>
      )
    } else {
      const passProps=omit(this.props, ['doc', 'unloadDocument', 'loadDocument', 'loading'])
      return (<a {...passProps}>{this.props.children}</a>)
    }

  }
}

class MarkdownGlossary extends React.PureComponent {
  render() {
    const { content } = this.props
    return (
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
    )
  }
}

export default MarkdownGlossary
