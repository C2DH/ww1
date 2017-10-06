import React from 'react'
import { connect } from 'react-redux'
import { Converter } from 'showdown'
import Markdown from 'markdown-to-jsx';
import { get, omit } from 'lodash'
import { Origin } from 'redux-tooltip';


import * as api from '../../api'

import { translateDocument, getCurrentLanguage } from '../../state/selectors'


const converter = new Converter()




const mapStateToProps = state => ({
  lang: getCurrentLanguage(state),
})
// const DescriptionContent = connect(mapStateToProps, { loadDocument, unloadDocument})(DescriptionContentx)


const ObjectLink = connect(mapStateToProps)(class extends React.PureComponent {

  state = {
    doc : null
  }

  componentDidMount(){

    const {href='', lang} = this.props
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
    const {href='', lang} = this.props
    if(this.state.doc){
      const translatedDoc = translateDocument(lang)(this.state.doc)
      return (
        <a>
          <Origin content={`${translatedDoc.translated.description || translatedDoc.translated.title || translatedDoc.title}`}>{this.props.children}</Origin>
        </a>
      )
    } else {
      const passProps=omit(this.props, ['doc', 'unloadDocument', 'loadDocument', 'loading', 'lang', 'dispatch'])
      return (<a {...passProps}>{this.props.children}</a>)
    }

  }
})

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
