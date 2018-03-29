import React from 'react'
import { connect } from 'react-redux'
import { Converter } from 'showdown'
import Markdown from 'markdown-to-jsx';
import { get, omit } from 'lodash'
import { Origin, actions } from 'redux-tooltip';
import './MarkdownGlossary.css'


import * as api from '../../api'

import { translateDocument, getCurrentLanguage } from '../../state/selectors'


const converter = new Converter()




const mapStateToProps = state => ({
  lang: getCurrentLanguage(state),
})
// const DescriptionContent = connect(mapStateToProps, { loadDocument, unloadDocument})(DescriptionContentx)

const { toggle,place } = actions;

const ObjectLink = connect(mapStateToProps)(class extends React.PureComponent {

  state = {
    doc : null
  }

  constructor(props) {
     super(props);
     this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.props.dispatch(place('top'));
    this.props.dispatch(toggle());
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
      const splitedText = this.props.children.split(' ');
      return (
        <span>
        {splitedText && splitedText.map((text,i) => (
          <a className="markdown_glossary" key={text + i} onClick={this.handleToggle} >
            <Origin place='auto' content={`<div class="markdown_glossary_tooltip"> ${translatedDoc.translated.description || translatedDoc.translated.title || translatedDoc.title}</div>`}>{text}{splitedText.length-1 == i?'':' '}</Origin>
          </a>
        ))}
        </span>
      )
    } else {
      const passProps=omit(this.props, ['doc', 'unloadDocument', 'loadDocument', 'loading', 'lang', 'dispatch'])
      return (<a target='_blank' rel='noopener noreferrer' {...passProps}>{this.props.children}</a>)
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
