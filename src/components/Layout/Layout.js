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
            message={this.context.t('cookies')}
            buttonMessage={this.context.t('got it')}
            link={{msg:this.context.t('read more'), url:'https://ww1.lu', target:'_blank'}}
            onAccept={() => {}}
            styles={{
              banner:{position:'fixed', top:0, zIndex:9999999,backgroundColor: 'rgba(245, 99, 80, 0.6)'},
              message: { fontWeight: 400 },
              button: { fontFamily: "'Atlas Grotesk Web', Arial, sans-serif",backgroundColor: 'white', borderRadius: 999, top:0,marginTop:6,padding:'4px 12px' },
            }}
            dismissOnScroll={true} />
        </div>
      )
    }
}

Layout.contextTypes = {
  t: React.PropTypes.func.isRequired
}


const mapStateToProps = state => ({
  scrollLock: state.scrollLock,
})
export default withRouter(connect(mapStateToProps)(Layout))
