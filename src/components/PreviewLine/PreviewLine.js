import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { omit, set } from 'lodash'
import qs from 'query-string'
import './PreviewLine.css'

class PreviewLine extends PureComponent {

  clearPreview = () => {
    const lo = window.location
    const newSearch = qs.stringify(omit(qs.parse(qs.extract(lo.search)), '_t'))
    window.location.href = `${lo.protocol}//${lo.host}${lo.pathname}?${newSearch}`
  }

  reloadPreview = () => {
    const { token } = this.props
    const lo = window.location
    const newSearch = qs.stringify(set(qs.parse(qs.extract(lo.search)), '_t', token))
    window.location.href = `${lo.protocol}//${lo.host}${lo.pathname}?${newSearch}`
  }

  render() {
    const { token } = this.props
    if (!token) {
      return null
    }
    return (
      <div className='PreviewLine'>
        <div className='PreviewLineAction' onClick={this.reloadPreview}>reload</div>
        <div className='PreviewLineAction' onClick={this.clearPreview}>clear</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.preview.token,
})

export default connect(mapStateToProps)(PreviewLine)
