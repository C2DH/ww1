import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Label } from 'reactstrap'
import { getCurrentLanguage } from '../../state/selectors'
import './CollectionItemRelated.css'

class CollectionItemRelated extends PureComponent {
    render() {
      const { items, lang } = this.props
      return(
        <div className="CollectionItem__Relatedobjects">
        <h6 className="CollectionItem__label">{this.context.t('related objects')}</h6>
        { items.map(item => (
            <div key={item.id} className="CollectionItem__Relatedobjects_cont d-flex">
              <div className="CollectionItem__Relatedobjects__img_cont" style={{backgroundImage:`url(${item.snapshot})`}}>
              </div>
              <div className="CollectionItem__Relatedobjects__text_container">
                <h6>
                  <Link to={{ pathname:`/collection/item/${item.id}`, search: '?lang=' + lang.label.toLowerCase(), state:{modal:false} }} >
                    {item.translated.title}
                  </Link>
                </h6>
                <p>{item.translated.type}</p>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

CollectionItemRelated.contextTypes = {
    t: React.PropTypes.func.isRequired
}

export default connect(state => ({
  lang: getCurrentLanguage(state),
}))(CollectionItemRelated)
