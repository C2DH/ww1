import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { get, find } from 'lodash'
import qs from 'query-string'
import { setLanguage } from '../state/actions'
import { getLanguages, getCurrentLanguage } from '../state/selectors'
import { mergeQs } from '../utils'

class LangChooser extends PureComponent {
  componentDidMount() {
    const { languages, location } = this.props
    const lang = this.getLangFromQs(location.search)
    if (lang) {
      const newLag = find(languages, l => l.label.toLowerCase() === lang.toLowerCase())
      if (newLag) {
        this.props.setLanguage(newLag.code)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location || nextProps.currentLanguage !== this.props.currentLanguage) {
      const currentLangQs = this.getLangFromQs(nextProps.location.search)
      if (!currentLangQs || currentLangQs.toLowerCase() !== nextProps.currentLanguage.label.toLowerCase()) {
        const pathname = nextProps.location.pathname
        const search = '?' + mergeQs(nextProps.location, {
          lang: nextProps.currentLanguage.label.toLowerCase()
        })
        const state = nextProps.location.state
        const location = { pathname, search, state }
        this.props.history.replace(location)
      }
    }
  }

  getLangFromQs = (search) => {
    return get(qs.parse(search), 'lang')
  }

  render() {
    return this.props.children
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state),
  currentLanguage: getCurrentLanguage(state),
})
export default withRouter(connect(mapStateToProps, {
  setLanguage,
})(LangChooser))
