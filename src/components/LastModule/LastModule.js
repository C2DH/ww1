import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import './LastModule.css'

class LastModule extends PureComponent {

  render(){
    return (
      <div className="LastModule__container">
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
