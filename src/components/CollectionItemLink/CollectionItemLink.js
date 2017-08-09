import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'

export default class CollectionItemLink extends React.PureComponent {



  render(){
    const { doc } = this.props

    return (
        <Link to={{ pathname:`/collection/item/${doc.id}`, state:{modal:true} }}>
          <i className="material-icons md-24">ic_info</i>
        </Link>
    )
  }

}
