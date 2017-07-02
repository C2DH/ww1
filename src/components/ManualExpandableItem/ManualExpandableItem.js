import React, { PureComponent } from 'react'
import { Container } from 'reactstrap';
import './ManualExpandableItem.css'

class ManualExpandableItem extends PureComponent {

    state = {
      open:false
    }

    toggleExpand = () => {
      this.setState({
        open: !this.state.open
      })
    }

render () {
  const { title="", num="" } = this.props
  return (
      <Container className={this.state.open ? "ManualExpandableItem__containerOpen" : "ManualExpandableItem__containerClose" }>
        <div className="d-inline-flex w-100">
          <div className="ManualExpandableItem__num_container">
            <h3>{num}</h3>
          </div>
          <div className={this.state.open ? "ManualExpandableItem__titleContainerOpen" : null}>
            <h2>{title}</h2>
          </div>
          <div className="ManualExpandableItem__btn_container">
            <button onClick={this.toggleExpand} className="expandableItem__btn" key="button">
              {this.state.open ? <i className="icon-remove" /> : <i className="icon-add" />}
            </button>
          </div>
        </div>
        {this.state.open ?
        <div>
          <img src="https://images.pexels.com/photos/308663/pexels-photo-308663.jpeg?h=350&auto=compress&cs=tinysrgb" className="img-fluid" />
        </div> : null }
      </Container>

     )
   }
}

export default ManualExpandableItem
