import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ScrollLock from 'react-scrolllock'
import CookieBanner from 'react-cookie-banner';
import SideMenu from './SideMenu'
import './Layout.css'

class Layout extends PureComponent {
  getScrollTarget = (ref) => {
    this.scrollTarget = ref;
   }
  render(){
    const {children, scrollLock} = this.props;
    return(
        <div className="Layout">
          <SideMenu />
          <div className="Layout__Container" ref={this.getScrollTarget}>
            {children}
          </div>
          {scrollLock && <ScrollLock touchScrollTarget={this.scrollTarget} />}
          <CookieBanner
            message="We use cookies"
            onAccept={() => {}}
            styles={{
              banner:{position:'fixed', bottom:0, zIndex:9999999,backgroundColor: 'rgba(245, 99, 80, 0.6)'},
              message: { fontWeight: 400 }
            }}
            dismissOnScroll={true} />
        </div>
      )
    }
}

const mapStateToProps = state => ({
  scrollLock: state.scrollLock,
})
export default withRouter(connect(mapStateToProps)(Layout))
