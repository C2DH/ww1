import React, { PureComponent } from 'react'
import { Container, Row, Col, Collapse } from 'reactstrap';
import MarkdownGlossary from '../../components/MarkdownGlossary'
import './EducationExpandableItem.css'

class EducationExpandableItem extends PureComponent {

    state = {
      open:false
    }

    toggleExpand = () => {
      this.setState({
        open: !this.state.open
      })
    }

render () {

  return (
      <div className='EducationExpandableItem'>
        <div className='EducationExpandableItem__topRow'>
          <div className='EducationExpandableItem__counter'>
            <h1>{this.props.counter}</h1>
          </div>
          <div className='EducationExpandableItem__title'>
          <h6>
            {this.props.label}
          </h6>
          <h2 className="EducationExpandableItem__titleLabel" onClick={this.toggleExpand}>
              {this.props.title}
            </h2>
          </div>
          <div className="hidden-sm-down EducationExpandableItem__btn_cont">
            <button onClick={this.toggleExpand} className="btn btn-secondary EducationExpandableItem__btn" key="button">
              <i className="material-icons">{this.state.open ? 'remove': 'add'}</i>
            </button>
          </div>
        </div>
        <Collapse isOpen={this.state.open}>
          <div className="EducationExpandableItem__container">

            <div className="EducationExpandableItem__text">
              <MarkdownGlossary content={this.props.description} />
            </div>
          </div>
        </Collapse>
      </div>

     )
   }
}

export default EducationExpandableItem
