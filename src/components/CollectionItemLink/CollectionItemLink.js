import React from 'react'
import { connect } from 'react-redux'
import { getCurrentLanguage } from '../../state/selectors'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

class CollectionItemLink extends React.PureComponent {
  render() {
    const { doc, lang } = this.props

    return (
        <Link to={{ pathname:`/collection/item/${doc.id}`, search: '?lang=' + lang.label.toLowerCase(), state:{modal:true} }}>
          <i className="material-icons md-36">info</i>
        </Link>
    )
  }

}

export default connect(state => ({
  lang: getCurrentLanguage(state),
}))(CollectionItemLink)
