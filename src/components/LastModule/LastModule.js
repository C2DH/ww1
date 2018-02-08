import React from 'react';
import { Link } from 'react-router-dom'
import './LastModule.css'

  const LastModule = () => {
    return (
      <div className="LastModule__container">
        <h1>
            <Link to={{ pathname:`/themes`}}>
              Explore the other themes
            </Link>
        </h1>
      </div>
    );
  };

  export default LastModule;
