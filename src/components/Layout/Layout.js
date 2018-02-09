import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ScrollLock from 'react-scrolllock'
import SideMenu from './SideMenu'
import './Layout.css'

class Layout extends PureComponent {
  getScrollTarget = (ref) => { console.log(this.scrollTarget); this.scrollTarget = ref; }
  render(){
    const {children, scrollLock} = this.props;
    return(
        <div className="Layout">
          <SideMenu />
          <div className="Layout__Container" ref={this.getScrollTarget}>
            {children}
          </div>
          {scrollLock && <ScrollLock touchScrollTarget={this.scrollTarget} />}
        </div>
      )
    }
}

const mapStateToProps = state => ({
  scrollLock: state.scrollLock,
})
export default withRouter(connect(mapStateToProps)(Layout))
