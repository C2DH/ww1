import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import './LastModule.css'

class LastModule extends PureComponent {

  render(){
    const {backgroundColor, backgroundOverlay} = this.props;

    const color = backgroundOverlay?backgroundOverlay:backgroundColor;

    const style = {
      background: `linear-gradient(to bottom, ${color} 0%, #212122 25%, #212122 100%)`,
    }
    return (
      <div className="LastModule__container" style={style}>
        <h1>
            <Link to={{ pathname:`/themes`}}>
              {this.context.t('explore the other themes')}
            </Link>
        </h1>
      </div>
    );
  }

};

  LastModule.contextTypes = {
    t: React.PropTypes.func.isRequired
  }

  export default LastModule;
